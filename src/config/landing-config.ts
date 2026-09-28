export type DemoAccess = "login" | "oneclick";

export interface LandingConfig {
  demoAccess: DemoAccess;
  showRoadmap: boolean;
}

export function getLandingConfig(): LandingConfig {
  const envDemo = process.env.NEXT_PUBLIC_DEMO_ACCESS;
  const envRoadmap = process.env.NEXT_PUBLIC_SHOW_ROADMAP;

  return {
    demoAccess: envDemo === "oneclick" ? "oneclick" : "login",
    showRoadmap: envRoadmap !== "false",
  };
}
