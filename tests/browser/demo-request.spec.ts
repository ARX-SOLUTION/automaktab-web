import { expect, test, type Page } from "@playwright/test";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const CRM_STUB_PORT = 38932;

type UpstreamRequest = {
  method: string | undefined;
  url: string | undefined;
  body: string;
  respond: (status?: number) => void;
};

const requests: UpstreamRequest[] = [];
let resolveNextRequest: ((request: UpstreamRequest) => void) | undefined;

function handleRequest(request: IncomingMessage, response: ServerResponse) {
  if (request.url?.startsWith("/blog-posts")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end("[]");
    return;
  }
  const chunks: Buffer[] = [];
  request.on("data", (chunk: Buffer) => chunks.push(chunk));
  request.on("end", () => {
    let responded = false;
    const captured: UpstreamRequest = {
      method: request.method,
      url: request.url,
      body: Buffer.concat(chunks).toString("utf8"),
      respond: (status = 201) => {
        if (responded) return;
        responded = true;
        response.writeHead(status, { "Content-Type": "application/json" });
        response.end('{"ok":true}');
      },
    };
    requests.push(captured);
    resolveNextRequest?.(captured);
    resolveNextRequest = undefined;
  });
}

const crmStub = createServer(handleRequest);

function waitForUpstreamRequest(): Promise<UpstreamRequest> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("CRM stub did not receive a request within 5s")),
      5_000,
    );
    resolveNextRequest = (request) => {
      clearTimeout(timeout);
      resolve(request);
    };
  });
}

test.beforeAll(async () => {
  await new Promise<void>((resolve, reject) => {
    crmStub.once("error", reject);
    crmStub.listen(CRM_STUB_PORT, "127.0.0.1", resolve);
  });
});

test.beforeEach(() => {
  requests.splice(0);
  resolveNextRequest = undefined;
});

test.afterEach(() => {
  for (const request of requests) request.respond(500);
  resolveNextRequest = undefined;
});

test.afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    crmStub.close((error) => (error ? reject(error) : resolve()));
    crmStub.closeAllConnections();
  });
});

async function openForm(page: Page) {
  await page.goto("/en");
  await page
    .getByRole("button", { name: "15-minute introduction", exact: true })
    .first()
    .click();
  return page.getByRole("dialog");
}

test("submits one canonical request through the Next API route", async ({ page }) => {
  const dialog = await openForm(page);
  await dialog.getByLabel("Full name *").fill("  Alisher Karimov  ");
  await dialog.getByLabel("Phone *").fill("+998 90 123 45 67");
  await dialog.getByLabel("Region or city *").fill("  Tashkent  ");
  await dialog
    .getByLabel("Driving school name · optional")
    .fill("  Auto Maktab Academy  ");
  await dialog.getByLabel("Number of students · optional").selectOption("150-300");
  await dialog
    .getByLabel("Additional note · optional")
    .fill("  Please call after 18:00.  ");

  const upstreamRequest = waitForUpstreamRequest();
  const submit = dialog.locator('button[type="submit"]');
  await submit.click();
  const captured = await upstreamRequest;

  await expect(submit).toBeDisabled();
  await expect(submit).toHaveText(/Sending…/);
  expect(captured.method).toBe("POST");
  expect(captured.url).toBe("/demo-requests");
  expect(JSON.parse(captured.body)).toEqual({
    full_name: "Alisher Karimov",
    phone: "+998901234567",
    region: "Tashkent",
    center_name: "Auto Maktab Academy",
    student_count: "150-300",
    note: "Please call after 18:00.",
    source: "landing:en",
  });

  await dialog.locator("form").evaluate((form) => {
    (form as HTMLFormElement).requestSubmit();
  });
  await page.waitForTimeout(100);
  expect(requests).toHaveLength(1);

  captured.respond(201);
  await expect(dialog.getByRole("status")).toContainText("Request received");
  await expect(dialog.locator("form")).toHaveCount(0);
  await expect(dialog.locator('button[type="submit"]')).toHaveCount(0);
  expect(requests).toHaveLength(1);
});

test("shows browser validation errors without contacting the CRM", async ({ page }) => {
  const dialog = await openForm(page);
  await dialog.locator('button[type="submit"]').click();

  await expect(dialog.getByText("Complete this field")).toHaveCount(3);
  await expect(dialog.getByLabel("Full name *")).toBeFocused();
  await page.waitForTimeout(100);
  expect(requests).toHaveLength(0);
});
