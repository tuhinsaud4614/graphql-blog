import { SlateBlockButton, SlateMarkButton } from "@component";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import {
  BiBold,
  BiCodeCurly,
  BiHeading,
  BiItalic,
  BiUnderline,
} from "react-icons/bi";
import { CgFormatHeading } from "react-icons/cg";
import { ImQuotesLeft } from "react-icons/im";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from "react-icons/md";
import EmbedButton from "./EmbedButton";
import ImageButton from "./ImageButton";
import LinkButton from "./LinkButton";
import UnLinkButton from "./UnLinkButton";

const className = {
  root: "border-b dark:border-base-dark-300 px-2 py-1",
};

export default function Toolbar() {
  return (
    <header className={className.root}>
      <div className="flex items-center flex-wrap space-x-2 space-y-2 -ml-2 -mt-2">
        <SlateMarkButton
          aria-label="Mark bold"
          hotKey="mod+b"
          mark="bold"
          tip="Bold (⌘B)"
        >
          <BiBold size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark italic"
          hotKey="mod+i"
          mark="italic"
          tip="Italic (⌘I)"
        >
          <BiItalic size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark underline"
          hotKey="mod+u"
          mark="underline"
          tip="Underline (⌘U)"
        >
          <BiUnderline size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark code"
          hotKey="mod+`"
          mark="code"
          tip="Code (⌘U)"
        >
          <BiCodeCurly size={18} />
        </SlateMarkButton>
        <SlateBlockButton
          aria-label="Block heading 1"
          format="heading-one"
          tip="Heading h1"
        >
          <BiHeading size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Block heading 2"
          format="heading-two"
          tip="Heading h2"
        >
          <CgFormatHeading size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Block quote"
          format="block-quote"
          tip="Block quote"
        >
          <ImQuotesLeft size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Numbered list"
          format="numbered-list"
          tip="Numbered list"
        >
          <AiOutlineOrderedList size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Bulleted list"
          format="bulleted-list"
          tip="Bulleted list"
        >
          <AiOutlineUnorderedList size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align left"
          format="left"
          tip="Align left"
        >
          <MdFormatAlignLeft size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align center"
          format="center"
          tip="Align center"
        >
          <MdFormatAlignCenter size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align left"
          format="right"
          tip="Align right"
        >
          <MdFormatAlignRight size={18} />
        </SlateBlockButton>
        <LinkButton />
        <UnLinkButton />
        <ImageButton />
        <EmbedButton />
      </div>
    </header>
  );
}
