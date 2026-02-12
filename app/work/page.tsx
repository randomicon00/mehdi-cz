import { projectsData } from "@/data/projectsData";
import WorkCard from "@/components/WorkCard";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
  return (
    <>
      <div className="space-y-2 pb-8 pt-6 text-center md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Work
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Projects & Open-Source Contributions
        </p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projectsData.map((d) => (
            <WorkCard
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
              type={d.type}
            />
          ))}
        </div>
      </div>
    </>
  );
}
