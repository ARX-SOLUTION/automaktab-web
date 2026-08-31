"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { trackUmami } from "@/lib/umami";

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
        if (!event.defaultPrevented) trackUmami("demo_open", { locale });
      }}
    >
      {children}
    </a>
  );
}
