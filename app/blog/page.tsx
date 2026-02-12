import ListLayoutWithTags from "@/layouts/ListLayoutWithTags";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import { genPageMetadata } from "app/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import siteMetadata from "@/data/siteMetadata";

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: "Blog" });

export default function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  // Extract the tag query parameter
  const tag = searchParams.tag;
  // Get all posts and sort them
  const posts = allCoreContent(sortPosts(allBlogs));
  // If a tag is specified, filter posts that include that tag
  const filteredPosts = tag
    ? posts.filter((post) => post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
    : posts;

  const pageNumber = 1;
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  };

  // Create breadcrumb items
  const breadcrumbItems = [
    { name: "Home", url: siteMetadata.siteUrl },
    { name: "Blog", url: `${siteMetadata.siteUrl}/blog` },
  ];

  if (tag) {
    breadcrumbItems.push({
      name: `Tag: ${tag}`,
      url: `${siteMetadata.siteUrl}/blog?tag=${tag}`,
    });
  }

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ListLayoutWithTags
        posts={filteredPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={tag ? `Posts tagged "${tag}"` : "All Posts"}
        basePath="/blog"
      />
    </>
  );
}
