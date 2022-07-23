import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-php";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import { BaseText, Node, NodeEntry, Path, Text } from "slate";
import { RenderLeafProps } from "slate-react";

const className = {
  root: "text-[#f8f8f2] tab-2 hyphens-none",
};

interface LeafProps extends BaseText {
  [key: string]: string;
}

export default function Code({
  attributes,
  children,
  leaf,
}: Omit<RenderLeafProps, "text">) {
  const newLeaf = leaf as LeafProps;

  return (
    <span
      {...attributes}
      className={classNames(
        className.root,
        newLeaf.comment && "!text-[#6272a4]",
        (newLeaf.operator ||
          newLeaf.url ||
          newLeaf.entity ||
          newLeaf.variable) &&
          "text-[#f8f8f2]",
        newLeaf.keyword && "text-[#8be9fd]",
        (newLeaf.regex || newLeaf.important) && "text-[#ffb86c]",
        newLeaf.punctuation && "text-[#f8f8f2]",
        (newLeaf.property ||
          newLeaf.tag ||
          newLeaf.constant ||
          newLeaf.symbol ||
          newLeaf.deleted) &&
          "text-[#ff79c6]",
        (newLeaf.boolean || newLeaf.number) && "text-[#bd93f9]",
        (newLeaf.selector ||
          newLeaf["attr-name"] ||
          newLeaf.string ||
          newLeaf.char ||
          newLeaf.builtin ||
          newLeaf.inserted) &&
          "text-[#50fa7b]",
        (newLeaf.atrule ||
          newLeaf["attr-value"] ||
          newLeaf.function ||
          newLeaf["class-name"]) &&
          "text-[#f1fa8c]",
        (newLeaf.comment ||
          newLeaf.prolog ||
          newLeaf.doctype ||
          newLeaf.cdata) &&
          "text-[#6272a4]",
        newLeaf.important && "font-bold",
        newLeaf.entity && "cursor-help"
      )}
    >
      {children}
    </span>
  );
}

interface IRange {
  [x: string]:
    | boolean
    | {
        path: Path;
        offset: any;
      };
  anchor: {
    path: Path;
    offset: number;
  };
  focus: {
    path: Path;
    offset: any;
  };
}

const getLength = (token: string | Prism.Token) => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    // @ts-ignore
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }
};

export function decorateCode([node, path]: NodeEntry<Node>, language: string) {
  const ranges: IRange[] = [];
  if (!Text.isText(node)) {
    return ranges;
  }

  const tokens = Prism.tokenize(node.text, Prism.languages[language]);
  let start = 0;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== "string") {
      ranges.push({
        [token.type]: true,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      });
    }

    start = end;
  }

  return ranges;
}

// modifications and additions to prism library
Prism.languages.python = Prism.languages.extend("python", {});
Prism.languages.insertBefore("python", "prolog", {
  comment: { pattern: /##[^\n]*/, alias: "comment" },
});
Prism.languages.javascript = Prism.languages.extend("javascript", {});
Prism.languages.insertBefore("javascript", "prolog", {
  comment: { pattern: /\/\/[^\n]*/, alias: "comment" },
});
Prism.languages.html = Prism.languages.extend("html", {});
Prism.languages.insertBefore("html", "prolog", {
  comment: { pattern: /<!--[^\n]*-->/, alias: "comment" },
});
Prism.languages.markdown = Prism.languages.extend("markup", {});
Prism.languages.insertBefore("markdown", "prolog", {
  blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
    { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" },
  ],
  title: [
    {
      pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
      alias: "important",
      inside: { punctuation: /==+$|--+$/ },
    },
    {
      pattern: /(^\s*)#+.+/m,
      lookbehind: !0,
      alias: "important",
      inside: { punctuation: /^#+|#+$/ },
    },
  ],
  hr: {
    pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: "punctuation",
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: "punctuation",
  },
  "url-reference": {
    pattern:
      /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/,
    },
    alias: "url",
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern:
      /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
});
// @ts-ignore
Prism.languages.markdown.bold.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
// @ts-ignore
Prism.languages.markdown.italic.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
// @ts-ignore
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
  // @ts-ignore
  Prism.languages.markdown.italic
);
// @ts-ignore
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(
  // @ts-ignore
  Prism.languages.markdown.bold
);
