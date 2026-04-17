import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "./code-block";

import { cn } from "#lib/utils.ts";

export const MarkdownEditor = ({
  markdown,
  classNames = {},
}: {
  markdown: string;
  classNames?: {
    h1?: string;
    h2?: string;
    p?: string;
    ul?: string;
    ol?: string;
    li?: string;
    a?: string;
    img?: string;
  };
}) => {
  return (
    <MarkdownHooks
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        ul: (props) => (
          <ul
            className={cn(
              "mb-4 ml-6 list-disc text-lg wrap-anywhere [&>li>ul]:list-[circle] [&>li>ul>li>ul]:list-[square] [&>li>ul>li>ul>li>ul]:list-[lower-roman]",
              classNames.ul,
            )}
            {...props}
          />
        ),

        ol: (props) => (
          <ol
            className={cn(
              "mb-4 ml-6 list-decimal text-lg wrap-anywhere",
              classNames.ol,
            )}
            {...props}
          />
        ),

        a: (props) => (
          <a
            className={cn(
              "text-primary mb-3 text-lg wrap-anywhere underline",
              classNames.a,
            )}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),

        li: (props) => (
          <li
            className={cn("mb-1 text-lg wrap-anywhere", classNames.li)}
            {...props}
          />
        ),

        p: (props) => (
          <p
            className={cn("mb-3 text-lg wrap-anywhere", classNames.p)}
            {...props}
          />
        ),

        h1: (props) => (
          <h1
            className={cn(
              "mb-2 text-4xl font-extrabold wrap-anywhere",
              classNames.h1,
            )}
            {...props}
          />
        ),

        h2: (props) => (
          <h2
            className={cn(
              "mb-3 text-xl font-bold wrap-anywhere",
              classNames.h2,
            )}
            {...props}
          />
        ),

        code: CodeBlock,

        img: (props) => {
          // makes sure to give the right "loading" attribute to the image
          // depending of the fact that it is above or below the fold
          const [loading, setLoading] = useState<"lazy" | "eager">("eager");

          const imageRef = (node: HTMLImageElement) => {
            const observer = new IntersectionObserver(([entry]) => {
              if (!entry) {
                return;
              }

              setLoading(
                entry.boundingClientRect.top + window.scrollY >
                  window.innerHeight
                  ? "lazy"
                  : "eager",
              );
            });

            observer.observe(node);

            return () => {
              observer.disconnect();
            };
          };

          return (
            <img
              className={cn("m-auto block w-full", classNames.img)}
              loading={loading}
              {...props}
              ref={imageRef}
            />
          );
        },
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
};
