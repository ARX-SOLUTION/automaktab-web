import type { LandingContent } from "@/content/uz";
import RoadmapCard from "./RoadmapCard";
import ResourceModules from "./ResourceModules";

interface ResourceCardsProps {
  content: LandingContent["resources"];
  scenes: LandingContent["scenes"];
  showRoadmap?: boolean;
}

export default function ResourceCards({ content, scenes, showRoadmap = true }: ResourceCardsProps) {
  return (
    <section data-screen-label="07 Resurslar" className="resources-section" aria-labelledby="resources-heading">
      <div className="landing-container">
        <h2 id="resources-heading" className="story-heading">{content.title}</h2>
        <ResourceModules label={content.title} modules={content.modules} scenes={scenes} />
        <div className="resource-support">
          <article className="resource-expenses"><h3>{content.expenseCard.title}</h3><p>{content.expenseCard.description}</p></article>
          <article className="resource-branches"><h3>{content.teamCard.title}</h3><p>{content.teamCard.description}</p><dl>{content.teamCard.stats.map((stat) => <div key={stat.label}><dd>{stat.count}</dd><dt>{stat.label}</dt></div>)}</dl><small>{content.teamCard.sampleNote}</small></article>
          {showRoadmap && <RoadmapCard content={content.roadmapCard} />}
        </div>
      </div>
    </section>
  );
}
