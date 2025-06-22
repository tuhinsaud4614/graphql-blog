"use client";

import * as React from "react";

import { ClipboardIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import Button from "../Button";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

export default function CodeBlock({
  code,
  language,
  showCopyButton,
  showLineNumbers,
}: Readonly<CodeBlockProps>) {
  const { resolvedTheme } = useTheme();
  const selectedTheme = resolvedTheme === "dark" ? oneDark : oneLight;
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(console.error);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: "8px",
          fontSize: "14px",
        }}
        codeTagProps={{
          style: {
            fontFamily: "Fira Code, Consolas, Monaco, monospace",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
      {showCopyButton && (
        <div className="absolute right-1 top-1 z-10 flex items-center gap-2">
          {copied && (
            <span className="rounded bg-success-foreground px-0.5 py-px text-xs font-medium text-success shadow">
              Copied!
            </span>
          )}
          <Button
            variant="neutral"
            mode="text"
            className="p-0.5"
            type="button"
            onClick={handleCopy}
          >
            <ClipboardIcon className="size-4 cursor-pointer" />
          </Button>
        </div>
      )}
    </div>
  );
}
