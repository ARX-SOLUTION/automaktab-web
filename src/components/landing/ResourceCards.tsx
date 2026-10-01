import { Check } from "lucide-react";
import type { LandingContent } from "@/content/uz";
import RoadmapCard from "./RoadmapCard";
import ProductScene from "./ProductScene";

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
        <div className="module-proofs">
          {content.modules.map((module) => <article key={module.kind} data-module-proof={module.kind} className={`module-proof module-proof-${module.kind}`}>
            <div className="module-copy"><h3>{module.title}</h3><p>{module.description}</p><ul>{module.points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul></div>
            <ProductScene kind={module.kind} content={scenes} />
          </article>)}
        </div>
        <div className="resource-support">
          <article className="resource-expenses"><h3>{content.expenseCard.title}</h3><p>{content.expenseCard.description}</p></article>
          <article className="resource-branches"><h3>{content.teamCard.title}</h3><p>{content.teamCard.description}</p><dl>{content.teamCard.stats.map((stat) => <div key={stat.label}><dd>{stat.count}</dd><dt>{stat.label}</dt></div>)}</dl><small>{content.teamCard.sampleNote}</small></article>
          {showRoadmap && <RoadmapCard content={content.roadmapCard} />}
        </div>
      </div>
    </section>
  );
}
