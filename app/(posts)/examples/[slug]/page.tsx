import { notFound } from "next/navigation";

import { Layout } from "@/components/screens/posts";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";

const route = "examples";

const Posts = getPosts(route);

export async function generateStaticParams() {
  return Posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = Posts.find((p) => p.slug === slug);
  const title = post ? post.title : "";
  const image = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://tyronemt.cc/"}api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = Posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <Layout post={post} route={route} />;
}
