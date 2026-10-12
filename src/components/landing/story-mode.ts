import { useEffect, useLayoutEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Sticky scroll stories run only where globals.css lays them out side by side. */
export const STORY_QUERY = "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";

/** Live media query match; the server and the first hydration render use `serverValue`. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True while a story is a stack of chapters, where only the current chapter stays open. Server markup keeps every chapter open. */
export function useCompactStory() {
  return !useMediaQuery(STORY_QUERY, true);
}

/** Opening or closing a disclosure moves everything below it; keep later scroll triggers in place. */
export function useRefreshOnResize(target: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const element = target.current;
    if (!enabled || !element) return;
    let frame = 0;
    let height = element.offsetHeight;
    // PageMotion refreshes and restores the reading position itself after a motion preference change.
    const changing = () => element.closest("main")?.dataset.motionChanging === "true";
    const refresh = () => { if (!changing()) ScrollTrigger.refresh(); };
    const resize = new ResizeObserver(() => {
      if (element.offsetHeight === height) return;
      height = element.offsetHeight;
      cancelAnimationFrame(frame);
      if (!changing()) frame = requestAnimationFrame(refresh);
    });
    resize.observe(element);
    refresh();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, [target, enabled]);
}

/** Keeps the tapped summary in place while the chapter above it collapses. Call the result before changing `key`. */
export function useKeepInView(key: unknown) {
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);
  useLayoutEffect(() => {
    const pending = anchor.current;
    anchor.current = null;
    if (pending) window.scrollBy({ top: pending.element.getBoundingClientRect().top - pending.top, behavior: "instant" });
  }, [key]);
  return (element: HTMLElement) => { anchor.current = { element, top: element.getBoundingClientRect().top }; };
}
