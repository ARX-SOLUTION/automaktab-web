"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";

const DEMO_URL = "https://app.automaktab.uz/login?demo=1";

export default function DemoLink({
  locale,
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      href={DEMO_URL}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) track("cta_demo_click", { locale, location: "supporting_page" });
      }}
    >
      {children}
    </a>
  );
}
