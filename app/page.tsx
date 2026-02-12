import { Authors, allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import AuthorLayout from "@/layouts/AuthorLayout";
import { coreContent } from "pliny/utils/contentlayer";
import { genPageMetadata } from "app/seo";
import { PersonJsonLd } from "@/components/JsonLd";

export const metadata = genPageMetadata({ title: "About" });

import { sortPosts, allCoreContent } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import Main from "./Main";

export default function Page() {
  const author = allAuthors.find((p) => p.slug === "default") as Authors;
  const mainContent = coreContent(author);

  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);

  return (
    <>
      <PersonJsonLd />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
      <Main posts={posts} />
    </>
  );
}
