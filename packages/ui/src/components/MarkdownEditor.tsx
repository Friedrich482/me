import { useState } from "react";
import { MarkdownHooks } from "react-markdown";
import { Check, Copy } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import z from "zod";

import { Button } from "@repo/ui/components/ui/button";

import "highlight.js/styles/hybrid.css";

type IconType = "copy" | "check";

const MarkdownEditor = ({ markdown }: { markdown: string }) => {
  return (
    <MarkdownHooks
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        ul: (props) => (
          <ul className="mb-4 ml-6 list-disc text-lg" {...props} />
        ),
        ol: (props) => (
          <ol className="mb-4 ml-6 list-decimal text-lg" {...props} />
        ),
        a: (props) => (
          <a className="text-primary mb-3 text-lg underline" {...props} />
        ),
        li: (props) => <li className="mb-1 text-lg" {...props} />,
        p: (props) => <p className="mb-3 text-lg" {...props} />,
        h1: (props) => (
          <h1 className="mb-4 text-4xl font-extrabold" {...props} />
        ),
        h2: (props) => <h2 className="mb-3 text-xl font-bold" {...props} />,

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
                className="bg-secondary/65 mb-4 overflow-x-auto rounded-sm p-2 text-lg"
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
            return <code className="text-lg" {...props} />;
          }
          return (
            <code
              className="bg-secondary/50 rounded-sm px-2 py-1 text-lg"
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
