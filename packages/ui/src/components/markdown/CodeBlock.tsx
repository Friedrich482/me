import React, { memo, useState } from "react";
import { type Element as HastElement } from "hast";
import { Check, Copy } from "lucide-react";
import { z } from "zod";

import Highlighter from "./Highlighter";

import { Button } from "#components/ui/button.tsx";
import { cn } from "#lib/utils.ts";

type IconType = "copy" | "check";

const CodeBlock = memo(
  ({
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
  } & React.HTMLAttributes<HTMLElement>) => {
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

    const match = /language-(\w+)/.exec(className || "");
    const lang = match && match[1] ? match[1] : "text";

    const code = (
      node?.children[0] as Exclude<HastElement["children"][0], HastElement>
    ).value;

    return !inline && match ? (
      <div className="relative">
        <Button
          size="icon"
          className="dark:text-primary dark:hover:bg-muted dark:bg-background absolute top-3 right-3 z-50 border"
          title="Copy to clipboard"
          type="button"
          onClick={() => handleCopyToClipBoardButtonClick(code)}
        >
          {iconType === "copy" ? <Copy /> : <Check />}
        </Button>

        <Highlighter code={code} lang={lang} />
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
);

export default CodeBlock;
