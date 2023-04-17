import { BottomSheet } from "@/components";

import Fetcher from "./Fetcher";

interface Props {
  open: boolean;
  onClose(): void;
}

export default function FloatingComments({ onClose, open }: Props) {
  return (
    <BottomSheet
      open={open}
      onHide={onClose}
      classes={{ container: "overflow-y-auto" }}
    >
      <Fetcher onClose={onClose} />
    </BottomSheet>
  );
}
