interface Project {
  title: string;
  description: string;
  href?: string;
  imgSrc?: string;
  type?: string;
}

export const projectsData: Project[] = [
  {
    title: "MonitorMe",
    description: `Worked as the Lead Software Engineer for MonitorMe which is an open-source full-stack observability framework for distributed microservices.`,
    imgSrc: "/static/images/monitorme.png",
    href: "https://github.com/randomicon00/monitorme",
    type: "personal",
  },
  {
    title: "Rust Programming Language",
    description:
      "Contributed to the Rust compiler and tooling—enhancing borrow-checker diagnostics and optimizing compilation performance.",
    imgSrc: "/static/images/rust.png",
    href: "https://github.com/rust-lang/rust",
    type: "opensource",
  },
  {
    title: "Deno",
    description: `A secure JavaScript and TypeScript runtime built in Rust, with ES module support, top-level await, and built-in tooling (formatter, linter, test runner).`,
    imgSrc: "/static/images/deno.png",
    href: "https://github.com/denoland/deno",
    type: "opensource",
  },
  {
    title: "Rust Analyzer",
    description: `Rust Analyzer is a modular compiler frontend for Rust, powering editors with smart features like code completion, go-to-definition, real-time diagnostics, and refactoring support.`,
    imgSrc: "/static/images/rust_analyzer.png",
    href: "https://github.com/rust-lang/rust-analyzer",
    type: "opensource",
  },
  {
    title: "DICOM Viewer",
    description:
      "Interactive web–based DICOM image viewer built with React and Cornerstone3D. Supports slice navigation, zoom, pan, and window-level adjustments.",
    imgSrc: "/static/images/dicom_viewer.png",
    href: "https://github.com/randomicon00/dicomviewer",
    type: "personal",
  },
  {
    title: "Go Queue",
    description:
      "A lightweight, high-performance job queue library written in Go. Easy to integrate for background task processing and scalable microservices.",
    imgSrc: "/static/images/go_queue.png",
    href: "https://github.com/randomicon00/go-queue",
    type: "opensource",
  },
];

export const mainProjectData: Project = {
  title: "What is MonitorMe?",
  description: `MonitorMe is an integrated observability platform using OpenTelemetry to monitor backend performance and replay frontend events for rapid error detection. Its intuitive UI delivers near real-time insights.`,
  imgSrc: "/static/images/new-application.png",
  href: "/blog/the-time-machine",
};
