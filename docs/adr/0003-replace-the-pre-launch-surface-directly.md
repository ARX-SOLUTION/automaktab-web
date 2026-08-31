# Replace the pre-launch marketing surface directly

Treat the redesign as one coherent replacement. Remove the Road Signal theme switcher, road/car animation vocabulary, fabricated product mocks, obsolete components, and superseded analytics decisions directly. Do not keep legacy aliases, parallel themes, compatibility wrappers, or Yandex-and-Umami dual tracking. Internal marketing-site components are not public compatibility contracts; update their callers and focused tests atomically.

The public site is already reachable, so pre-launch status does not make its search surface disposable. Preserve `/`, `/ru`, and `/en`, along with canonical URLs, `hreflang`, localized metadata, robots, sitemap, and useful inbound links. This decision does not authorize changes to CRM databases, backend APIs, or production customer data. The sole cross-repository exception is the dedicated synthetic-demo entry behavior and its `demo_enter` event in `autodrive-frontend`; it must reuse the existing demo-auth contract rather than create another authentication path.

The published blog record is content, not a compatibility contract. Correcting its unsupported claims through the existing admin/content workflow is a separate, explicitly reviewed publication action; it does not justify a backend schema, endpoint, migration, seed, or frontend sanitizing layer.
