import * as React from "react";

import Image from "next/image";

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
  // Custom renderers with Tailwind CSS classes
  const customRenderers = {
    header: ({ data }: any) => {
      const Tag = `h${data.level}` as keyof React.JSX.IntrinsicElements;
      const headerClasses = {
        1: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mt-0 mb-6 leading-tight",
        2: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight",
        3: "text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3 leading-snug",
        4: "text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-5 mb-3 leading-snug",
        5: "text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100 mt-4 mb-2 leading-normal",
        6: "text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 mt-3 mb-2 leading-normal",
      };

      return (
        <Tag
          className={headerClasses[data.level as keyof typeof headerClasses]}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );
    },

    paragraph: ({ data }: any) => (
      <p
        className="mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    ),

    list: ({ data }: any) => {
      const Tag = data.style === "ordered" ? "ol" : "ul";
      const listClasses =
        data.style === "ordered"
          ? "list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300"
          : "list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300";

      return (
        <Tag className={listClasses}>
          {data.items.map((item: string, index: number) => (
            <li
              key={index}
              className="pl-2 text-base leading-relaxed marker:text-gray-500 dark:marker:text-gray-400 md:text-lg"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </Tag>
      );
    },

    quote: ({ data }: any) => (
      <blockquote className="relative mb-8 rounded-r-lg border-l-4 border-blue-500 bg-gray-50 p-6 dark:bg-gray-800">
        <div className="absolute left-2 top-2 select-none font-serif text-6xl leading-none text-blue-500/20">
          {"“"}
        </div>
        <p
          className="relative z-10 mb-3 text-lg italic leading-relaxed text-gray-800 dark:text-gray-200 md:text-xl"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
        {data.caption && (
          <cite className="block text-sm font-medium not-italic text-gray-600 dark:text-gray-400">
            <span className="mr-1 text-gray-400">—</span>
            <span dangerouslySetInnerHTML={{ __html: data.caption }} />
          </cite>
        )}
      </blockquote>
    ),

    image: ({ data }: any) => (
      <figure className="mb-8 text-center">
        <div className="inline-block overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
          <Image
            src={data.file.url}
            alt={data.caption || ""}
            className="block h-auto max-w-full"
          />
        </div>
        {data.caption && (
          <figcaption
            className="mx-auto mt-3 max-w-2xl text-sm italic text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: data.caption }}
          />
        )}
      </figure>
    ),

    code: ({ data }: any) => (
      <div className="mb-6">
        <pre className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-6 text-sm leading-relaxed text-gray-100 dark:bg-gray-950">
          <code
            className="font-mono"
            dangerouslySetInnerHTML={{ __html: data.code }}
          />
        </pre>
      </div>
    ),

    delimiter: () => (
      <div className="my-12 flex justify-center">
        <div className="h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600"></div>
      </div>
    ),

    table: ({ data }: any) => (
      <div className="mb-8 overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
          <table className="min-w-full">
            <tbody>
              {data.content.map((row: string[], rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex === 0
                      ? "bg-gray-100 dark:bg-gray-800"
                      : rowIndex % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "dark:bg-gray-850 bg-gray-50"
                  }`}
                >
                  {row.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className={`border-b border-gray-200 px-4 py-3 text-left text-gray-700 dark:border-gray-700 dark:text-gray-300 ${
                        rowIndex === 0
                          ? "font-semibold text-gray-900 dark:text-gray-100"
                          : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    warning: ({ data }: any) => (
      <div className="mb-8 rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-6 dark:bg-yellow-900/20">
        <div className="flex items-start">
          <div className="shrink-0">
            <svg
              className="mt-0.5 size-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h4
              className="mb-2 font-semibold text-yellow-800 dark:text-yellow-200"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
            <p
              className="leading-relaxed text-yellow-700 dark:text-yellow-300"
              dangerouslySetInnerHTML={{ __html: data.message }}
            />
          </div>
        </div>
      </div>
    ),

    checklist: ({ data }: any) => (
      <div className="mb-6 space-y-3">
        {data.items.map((item: any, index: number) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 shrink-0">
              <div
                className={`flex size-5 items-center justify-center rounded border-2 ${
                  item.checked
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                }`}
              >
                {item.checked && (
                  <svg
                    className="size-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span
              className={`flex-1 text-base leading-relaxed ${
                item.checked
                  ? "text-gray-500 line-through dark:text-gray-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    ),

    linkTool: ({ data }: any) => (
      <div className="mb-8">
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border border-gray-200 bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex flex-col md:flex-row">
            {data.meta.image?.url && (
              <div className="h-32 shrink-0 bg-gray-100 dark:bg-gray-700 md:h-auto md:w-48">
                <Image
                  src={data.meta.image.url}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {data.meta.title}
              </h3>
              <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {data.meta.description}
              </p>
              <p className="truncate font-mono text-xs text-blue-600 dark:text-blue-400">
                {data.link}
              </p>
            </div>
          </div>
        </a>
      </div>
    ),

    embed: ({ data }: any) => (
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800">
          <iframe
            src={data.embed}
            width="100%"
            height={data.height || 400}
            frameBorder="0"
            allowFullScreen
            className="w-full"
          />
        </div>
        {data.caption && (
          <p
            className="mt-3 text-center text-sm italic text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: data.caption }}
          />
        )}
      </div>
    ),

    // Raw HTML renderer for unsupported blocks
    raw: ({ data }: any) => (
      <div
        className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 "
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    ),
  };

  return (
    <div className={cn(className)}>
      <Blocks
        data={data}
        renderers={{
          code: ({ data }) => {
            const { code, showlinenumbers, language, showCopyButton } = data as CodeblockData;
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
