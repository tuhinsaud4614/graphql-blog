import { ReactorModal, ReactorModalItem } from "@component";

interface Props {
  open: boolean;
  onClose(): void;
}

export default function FloatingLikes({ onClose, open }: Props) {
  return (
    <ReactorModal
      title={`578 likes for "Goodbye Node JS"`}
      open={open}
      onHide={onClose}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <ReactorModalItem key={index} />
      ))}
    </ReactorModal>
  );
}
