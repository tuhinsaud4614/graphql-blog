import {
  BiBold,
  BiCode,
  BiHeading,
  BiItalic,
  BiUnderline,
} from "react-icons/bi";
import { CgFormatHeading } from "react-icons/cg";
import BlockButton from "./BlockButton";
import MarkButton from "./MarkButton";

const className = {
  root: "border-b px-2 py-1",
};

export default function Toolbar() {
  return (
    <header className={className.root}>
      <div className="flex items-center flex-wrap space-x-2 space-y-2 -ml-2 -mt-2">
        <MarkButton
          aria-label="Mark bold"
          hotKey="mod+b"
          mark="bold"
          tip="Bold (⌘B)"
        >
          <BiBold size={18} />
        </MarkButton>
        <MarkButton
          aria-label="Mark italic"
          hotKey="mod+i"
          mark="italic"
          tip="Italic (⌘I)"
        >
          <BiItalic size={18} />
        </MarkButton>
        <MarkButton
          aria-label="Mark underline"
          hotKey="mod+u"
          mark="underline"
          tip="Underline (⌘U)"
        >
          <BiUnderline size={18} />
        </MarkButton>
        <MarkButton
          aria-label="Mark underline"
          hotKey="mod+`"
          mark="code"
          tip="Underline (⌘`)"
        >
          <BiCode size={18} />
        </MarkButton>
        <BlockButton
          aria-label="Mark underline"
          format="heading-one"
          tip="Heading h1"
        >
          <BiHeading size={18} />
        </BlockButton>
        <BlockButton
          aria-label="Mark underline"
          format="heading-two"
          tip="Heading h2"
        >
          <CgFormatHeading size={18} />
        </BlockButton>
      </div>
    </header>
  );
}
