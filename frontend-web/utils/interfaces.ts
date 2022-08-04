import { EmptyText } from "components/PostEditor/utils";
import { Descendant } from "slate";

export interface IAnchorOrigin {
  horizontal?: "center" | "right" | "left";
  vertical?: "bottom" | "top";
}

export interface SlateVideoElement {
  type: "video";
  url: string;
  children: EmptyText[];
}

export type SlateLinkElement = {
  type: "link";
  url: string;
  children: Descendant[];
};
