import {
  BottomSheet,
  ModalHeader,
  ReactBox,
  ReactorModal,
  ReactorModalItem,
} from "components";
import { Fragment, RefObject, useState } from "react";
import Comment from "./Comment";

const className = {
  bottomHeader: "border-none",
  bottomBody: "overflow-y-auto pb-6",
};

interface Props {
  siblingRef: RefObject<Element>;
}

export default function Reactions({ siblingRef }: Props) {
  const [openLikeModal, setOpenLikeBox] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  return (
    <Fragment>
      <ReactBox
        siblingRef={siblingRef}
        commentCount={100}
        likeCount={100}
        onLiker={() => setOpenLikeBox(true)}
        onComment={() => setOpenCommentModal(true)}
      />
      <ReactorModal
        title={`578 likes for "Goodbye Node JS"`}
        open={openLikeModal}
        onHide={() => setOpenLikeBox(false)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
      <BottomSheet
        open={openCommentModal}
        onHide={() => setOpenCommentModal(false)}
      >
        <ModalHeader
          onClose={() => setOpenCommentModal(false)}
          className={className.bottomHeader}
        >
          Responses (9)
        </ModalHeader>
        <div className={className.bottomBody}>
          <Comment />
        </div>
      </BottomSheet>
    </Fragment>
  );
}
