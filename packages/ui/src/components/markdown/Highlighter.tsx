import { memo, useEffect, useState } from "react";
import { codeToHtml, ShikiTransformer } from "shiki";

const codeTransformer: ShikiTransformer = {
  pre(node) {
    this.addClassToHast(node, "rounded-sm p-2 text-lg w-0 min-w-full");
  },
  code(node) {
    this.addClassToHast(
      node,
      "overflow-x-scroll rounded-sm text-lg block p-2 w-full",
    );
  },
  line(node) {
    this.addClassToHast(node, "w-full");
  },
};

const Highlighter = memo(({ code, lang }: { lang: string; code: string }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    codeToHtml(code, {
      theme: "dark-plus",
      lang: lang,
      transformers: [codeTransformer],
    }).then(setHtml);
  }, [code, lang]);

  return <div dangerouslySetInnerHTML={{ __html: html }} className="mb-3" />;
});

export default Highlighter;
