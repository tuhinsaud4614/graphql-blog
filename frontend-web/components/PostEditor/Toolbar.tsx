"use client";

import { SlateBlockButton, SlateMarkButton } from "@/components";

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, Code2Icon, Heading2Icon, HeadingIcon, ItalicIcon, ListIcon, ListOrderedIcon, QuoteIcon, UnderlineIcon } from "lucide-react";
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
      <div className="-ml-2 -mt-2 flex flex-wrap items-center space-x-2 space-y-2">
        <SlateMarkButton
          aria-label="Mark bold"
          hotKey="mod+b"
          mark="bold"
          tip="Bold (⌘B)"
          className="first:ml-2 first:mt-2"
        >
          <BoldIcon size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark italic"
          hotKey="mod+i"
          mark="italic"
          tip="Italic (⌘I)"
        >
          <ItalicIcon size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark underline"
          hotKey="mod+u"
          mark="underline"
          tip="Underline (⌘U)"
        >
          <UnderlineIcon size={18} />
        </SlateMarkButton>
        <SlateMarkButton
          aria-label="Mark code"
          hotKey="mod+`"
          mark="code"
          tip="Code (⌘U)"
        >
          <Code2Icon size={18} />
        </SlateMarkButton>
        <SlateBlockButton
          aria-label="Block heading 1"
          format="heading-one"
          tip="Heading h1"
        >
          <HeadingIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Block heading 2"
          format="heading-two"
          tip="Heading h2"
        >
          <Heading2Icon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Block quote"
          format="block-quote"
          tip="Block quote"
        >
          <QuoteIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Numbered list"
          format="numbered-list"
          tip="Numbered list"
        >
          <ListOrderedIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Bulleted list"
          format="bulleted-list"
          tip="Bulleted list"
        >
          <ListIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align left"
          format="left"
          tip="Align left"
        >
          <AlignLeftIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align center"
          format="center"
          tip="Align center"
        >
          <AlignCenterIcon size={18} />
        </SlateBlockButton>
        <SlateBlockButton
          aria-label="Align left"
          format="right"
          tip="Align right"
        >
          <AlignRightIcon size={18} />
        </SlateBlockButton>
        <LinkButton />
        <UnLinkButton />
        <ImageButton />
        <EmbedButton />
      </div>
    </header>
  );
}
