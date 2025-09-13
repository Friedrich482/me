import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import { Check, Copy } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import z from "zod";

import { Button } from "@repo/ui/components/ui/button";

import "highlight.js/styles/hybrid.css";
import { cn } from "#lib/utils.ts";

type IconType = "copy" | "check";

const MarkdownEditor = ({
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
    pre?: string;
    code?: string;
    inlineCode?: string;
  };
}) => {
  return (
    <MarkdownHooks
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        ul: (props) => (
          <ul
            className={cn("mb-4 ml-6 list-disc text-lg", classNames.ul)}
            {...props}
          />
        ),
        ol: (props) => (
          <ol
            className={cn("mb-4 ml-6 list-decimal text-lg", classNames.ol)}
            {...props}
          />
        ),
        a: (props) => (
          <a
            className={cn("text-primary mb-3 text-lg underline", classNames.a)}
            {...props}
          />
        ),
        li: (props) => (
          <li className={cn("mb-1 text-lg", classNames.li)} {...props} />
        ),
        p: (props) => (
          <p className={cn("mb-3 text-lg", classNames.p)} {...props} />
        ),
        h1: (props) => (
          <h1
            className={cn("mb-2 text-4xl font-extrabold", classNames.h1)}
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className={cn("mb-3 text-xl font-bold", classNames.h2)}
            {...props}
          />
        ),

        pre: (props) => {
          const [iconType, setIconType] = useState<IconType>("copy");

          const handleCopyToClipBoardButtonClick = async (content: unknown) => {
            let finalContent = "";

            const parsedContent = z.string().safeParse(content);
            if (!parsedContent.success) {
              finalContent = "";
            } else {
              finalContent = parsedContent.data;
            }

            await navigator.clipboard.writeText(finalContent);
            setIconType("check");
            setTimeout(() => setIconType("copy"), 3000);
          };

          return (
            <div className="relative">
              <pre
                className={cn(
                  "hljs mb-4 overflow-x-auto rounded-sm p-2 text-lg",
                  classNames.pre,
                )}
                {...props}
              />
              <Button
                size="icon"
                className="text-foreground hover:bg-input absolute top-3 right-3 bg-transparent"
                title="Copy to clipboard"
                onClick={() =>
                  handleCopyToClipBoardButtonClick(
                    (props.children as { props: { children: string } }).props
                      .children,
                  )
                }
                type="button"
              >
                {iconType === "copy" ? <Copy /> : <Check />}
              </Button>
            </div>
          );
        },

        code: (props) => {
          if (props.className?.includes("language-")) {
            return (
              <code className={cn("text-lg", classNames.code)} {...props} />
            );
          }
          return (
            <code
              className={cn(
                "bg-secondary/50 inline rounded-sm px-2 py-1 text-lg",
                classNames.inlineCode,
              )}
              {...props}
            />
          );
        },
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
};

export default MarkdownEditor;
