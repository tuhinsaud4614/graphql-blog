import * as React from "react";


import Blocks from "editorjs-blocks-react-renderer";

import { cn } from "@/lib/utils";

import CodeBlock from "./CodeBlock";

type CodeblockData = {
  code: string;
  language: string;
  showCopyButton: boolean;
  showlinenumbers: boolean;
};

interface EditorRendererProps {
  data: any;
  className?: string;
}

const EditorRenderer: React.FC<EditorRendererProps> = ({
  data,
  className = "",
}) => {
  return (
    <div className={cn(className)}>
      <Blocks
        data={data}
        renderers={{
          code: ({ data }) => {
            const { code, showlinenumbers, language, showCopyButton } =
              data as CodeblockData;
            return (
              <CodeBlock
                code={code}
                language={language}
                showLineNumbers={showlinenumbers}
                showCopyButton={showCopyButton}
              />
            );
          },
        }}
        config={{
          code: {
            className: "inline-code",
          },
          delimiter: {
            className: "ce-delimiter",
          },
          embed: {
            className: "embed-tool",
          },
          header: {
            className: "pt-[0.6em] pb-[3px] m-0 leading-[1.25em] outline-none",
          },
          image: {
            className: "image-tool",
          },
          list: {
            className:
              "list-disc m-0 pl-10 outline-none py-[0.4em] [&>li]:leading-[1.6em] [&>li]:pl-[3px] [&>li]:pr-0 [&>li]:py-[5.5px]",
          },
          paragraph: {
            className:
              "leading-[1.6em] outline-none py-[0.4em] [&_a]:underline [&_a]:decoration-primary [&_code.inline-code]:text-[#b44437] [&_code.inline-code]:text-[0.86em] [&_code.inline-code]:font-medium [&_code.inline-code]:tracking-[0.3px] [&_code.inline-code]:mx-px [&_code.inline-code]:my-0 [&_code.inline-code]:px-1 [&_code.inline-code]:py-[3px] [&_code.inline-code]:rounded-[5px] [&_code.inline-code]:bg-[rgba(250,_239,_240,_.78)]",
          },
          quote: {
            className: "cdx-quote",
          },
          table: {
            className: cn(
              "relative grid size-full border-t text-sm leading-[1.4]",
              "[&_thead_tr]:border-b-2 [&_thead_tr]:font-semibold [&_tr]:grid [&_tr]:grid-cols-[repeat(auto-fit,minmax(10px,1fr))] [&_tr]:border-b",
              "[&_th]:overflow-hidden [&_th]:border-r [&_th]:px-3 [&_th]:py-1.5 [&_th]:outline-none [&_th]:[line-break:_normal]",
              "[&_td]:overflow-hidden [&_td]:border-r [&_td]:px-3 [&_td]:py-1.5 [&_td]:outline-none [&_td]:[line-break:_normal]",
            ),
          },
        }}
      />
    </div>
  );
};

export default EditorRenderer;
