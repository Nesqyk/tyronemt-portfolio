import { Link as NextViewTransition } from "next-view-transitions";
import React from "react";
import * as FadeIn from "@/components/motion/staggers/fade";
import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";

export function generateMetadata() {
  const title = "Writing";
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

export default function Page() {
  const posts = getPosts("writing").sort((a, b) => {
    return new Date(b.time.created).getTime() - new Date(a.time.created).getTime();
  });

  const articles = posts.filter((p) => p.type !== "note");
  const notes = posts.filter((p) => p.type === "note");

  const Seperator = () => <div className="border-border border-t" />;

  return (
    <FadeIn.Item>
      <h1>Writing</h1>

      {articles.length > 0 && (
        <div className="mt-6 flex flex-col">
          <h2 className="py-2 text-muted">Articles ({articles.length})</h2>

          {articles.map((post) => (
            <React.Fragment key={post.slug}>
              <Seperator />
              <NextViewTransition href={`/writing/${post.slug}`} className="flex flex-col py-3">
                <div className="flex w-full justify-between">
                  <p>{post.title}</p>
                  <p className="mt-0 text-muted">{formatter.date(new Date(post.time.created))}</p>
                </div>
                {post.summary && <p className="mt-1 text-muted text-small">{post.summary}</p>}
              </NextViewTransition>
            </React.Fragment>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="mt-10 flex flex-col">
          <h2 className="py-2 text-muted">Notes ({notes.length})</h2>

          {notes.map((post) => (
            <React.Fragment key={post.slug}>
              <Seperator />
              <NextViewTransition href={`/writing/${post.slug}`} className="flex w-full justify-between py-2">
                <p>{post.title}</p>
                <p className="mt-0 text-muted">{formatter.date(new Date(post.time.created))}</p>
              </NextViewTransition>
            </React.Fragment>
          ))}
        </div>
      )}
    </FadeIn.Item>
  );
}
