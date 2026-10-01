import { GET as localizedGET } from "../../[locale]/opengraph-image/route";

export function GET(request: Request) {
  return localizedGET(request, {
    params: Promise.resolve({ locale: "uz" }),
  });
}
