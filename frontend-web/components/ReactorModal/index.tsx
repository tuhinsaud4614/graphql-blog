import * as React from "react";

import { Modal, ModalHeader } from "@/components";

const className = {
  modalBody: "overflow-y-auto scrollbar px-10 pb-10",
  modalBodyTitle:
    "text-xl text-neutral dark:text-neutral-dark font-medium text-center mb-6 capitalize",
  modalBodyItems: "list-none m-0 flex flex-col space-y-4",
  moreBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block bg-transparent active:scale-95 border border-neutral/60  text-neutral/60 hover:text-neutral hover:border-neutral",
};

interface Props {
  title: string;
  open: boolean;
  onHide(): void;
  children?: React.ReactNode;
}

export default function ReactorModal({ open, onHide, children, title }: Props) {
  return (
    <Modal open={open} onHide={onHide}>
      <ModalHeader onClose={onHide} className="border-none" />
      <div className={className.modalBody}>
        <h2 className={className.modalBodyTitle}>{title}</h2>
        <ul className={className.modalBodyItems}>{children}</ul>
      </div>
    </Modal>
  );
}
