import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Element as HastElement } from "hast";
import { Check, Copy } from "lucide-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import z from "zod";

import { Button } from "@repo/ui/components/ui/button";

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
      rehypePlugins={[rehypeRaw]}
      components={{
        ul: (props) => (
          <ul
            className={cn(
              "mb-4 ml-6 list-disc text-lg wrap-normal",
              classNames.ul,
            )}
            {...props}
          />
        ),
        ol: (props) => (
          <ol
            className={cn(
              "mb-4 ml-6 list-decimal text-lg wrap-normal",
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
            {...props}
          />
        ),
        li: (props) => (
          <li
            className={cn("mb-1 text-lg wrap-normal", classNames.li)}
            {...props}
          />
        ),
        p: (props) => (
          <p
            className={cn("mb-3 text-lg wrap-normal", classNames.p)}
            {...props}
          />
        ),
        h1: (props) => (
          <h1
            className={cn(
              "mb-2 text-4xl font-extrabold wrap-normal",
              classNames.h1,
            )}
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className={cn("mb-3 text-xl font-bold wrap-normal", classNames.h2)}
            {...props}
          />
        ),

        code({
          node,
          inline,
          className,
          children,
          style,
          ...props
        }: {
          node?: HastElement;
          inline?: boolean;
          className?: string;
          children?: React.ReactNode;
        } & React.HTMLAttributes<HTMLElement>) {
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
            const timeOutId = setTimeout(() => setIconType("copy"), 3000);
            return () => clearInterval(timeOutId);
          };

          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <div className="relative">
              <Button
                size="icon"
                className="dark:text-primary dark:hover:bg-muted dark:bg-background absolute top-3 right-3 z-50 border"
                title="Copy to clipboard"
                type="button"
                onClick={() =>
                  handleCopyToClipBoardButtonClick(
                    (
                      node?.children[0] as Exclude<
                        HastElement["children"][0],
                        HastElement
                      >
                    ).value,
                  )
                }
              >
                {iconType === "copy" ? <Copy /> : <Check />}
              </Button>

              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                customStyle={{
                  whiteSpace: "pre-line",
                  overflowX: "scroll",
                  overflowWrap: "break-word",
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "#1d1f21",
                  borderRadius: "calc(var(--radius) - 4px)",
                  padding: "0.5em",
                }}
                codeTagProps={{
                  className:
                    "w-0 min-w-full overflow-x-auto rounded-sm text-lg block p-2",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className={cn(
                "bg-secondary/50 inline rounded-sm px-2 py-1 text-lg",
                className,
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
};

export default MarkdownEditor;
