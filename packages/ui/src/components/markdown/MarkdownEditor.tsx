import { MarkdownHooks } from "react-markdown";

import CodeBlock from "./CodeBlock";

import { cn } from "#lib/utils.ts";

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
  };
}) => {
  return (
    <MarkdownHooks
      components={{
        ul: (props) => (
          <ul
            className={cn(
              "mb-4 ml-6 list-disc text-lg wrap-anywhere",
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
      }}
    >
      {markdown}
    </MarkdownHooks>
  );
};

export default MarkdownEditor;
