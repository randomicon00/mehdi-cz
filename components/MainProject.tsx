import MainCard from "@/components/MainCard";

const MainProject = ({ title, description, imgSrc, href }) => (
  <div className="xl:col-span-3">
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <h1 className="text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        I built MonitorMe
      </h1>
      <p className="text-center text-lg leading-7 text-gray-500 dark:text-gray-400">
        An AI-powered tool that quickly spots bugs and performance issues in microservices.
      </p>
    </div>
    <MainCard key={title} title={title} description={description} imgSrc={imgSrc} href={href} />
  </div>
);

export default MainProject;
