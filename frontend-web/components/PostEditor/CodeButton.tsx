import { useTooltip } from "@hooks";
import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef, Fragment, useState } from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import Button from "./Button";
import { useCodeLanguage, useCodeLanguageChanger } from "./context";
import { CODE_LANGUAGES, isMarkActive } from "./utils";

const Menu = dynamic(() => import("../Menu"), { ssr: false });

const className = {
  menuRoot:
    "flex flex-col list-none m-0 min-w-[7.5rem] max-h-48 overflow-y-auto",
  btn: "w-full outline-none border-none flex items-center px-2 py-1.5 text-sm hover:bg-base-200 text-neutral hover:text-accent active:scale-95 uppercase",
};

export interface Props extends ComponentPropsWithoutRef<"button"> {
  tip: string;
}

export default function CodeButton({ tip, ...rest }: Props) {
  const editor = useSlate();
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const { onHoverEnd, onHoverStart } = useTooltip();
  const changer = useCodeLanguageChanger();
  const codeLanguage = useCodeLanguage();
  const isActive = isMarkActive(editor, "code");

  const handler = () => {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.type === "code-block",
    });

    // Toggle the block type depending on whether there's already a match.

    Transforms.setNodes(
      editor,
      {
        // @ts-ignore
        type:
          match || isMarkActive(editor, "code") ? "paragraph" : "code-block",
      },
      { match: (n) => Editor.isBlock(editor, n) }
    );

    editor.addMark("code", !isActive);
  };

  return (
    <Fragment>
      <Button
        {...rest}
        className="flex items-center"
        onClick={(e) => {
          if (codeLanguage) {
            return changer(null);
          }
          setAnchorEle(e.currentTarget);
        }}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: tip,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-2 py-1.5",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
        isActive={isActive}
      >
        {rest.children}

        {codeLanguage && (
          <span className="ml-2 uppercase text-xs">{codeLanguage}</span>
        )}
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <ul className={className.menuRoot}>
          {CODE_LANGUAGES.map((language) => (
            <li key={language}>
              <button
                type="button"
                aria-label={language}
                className={className.btn}
                onClick={() => {
                  changer(language);
                  handler();
                  setAnchorEle(null);
                }}
              >
                {language}
              </button>
            </li>
          ))}
        </ul>
      </Menu>
    </Fragment>
  );
}
