import { Button, SlateViewer } from "@component";
import { useElementSize } from "@hooks";
import classNames from "classnames";
import { useState } from "react";
import { BsChat } from "react-icons/bs";
import { Descendant } from "slate";
import { countConvert } from "utils";

const className = {
  body: "mt-1.5",
  moreBtn:
    "my-1.5 text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success text-sm active:scale-95",
  actionsBar: "flex items-center mt-3.5",
  actionsContainer: "flex items-center",
  // actionBtn:
  //   "border-none outline-none text-neutral dark:text-neutral-dark text-sm hover:text-accent dark:hover:text-accent-dark active:scale-95 flex items-center underline",
};

// let globalShow = false;

interface Props {
  replyCount: number;
  className?: string;
  body: Descendant[];
  showReplies: boolean;
  toggleReplies?(): void;
  toggleReplyEditor?(): void;
}

export default function Body({
  replyCount,
  className: cls,
  body,
  showReplies,
  toggleReplies,
  toggleReplyEditor,
}: Props) {
  const [ref, { height }] = useElementSize();
  const [show, setShow] = useState(false);
  return (
    <section className={cls}>
      <div
        className={className.body}
        style={
          height > 112 && !show
            ? {
                maxHeight: "112px",
                overflowY: "hidden",
              }
            : undefined
        }
      >
        <div ref={ref}>
          <SlateViewer value={body} />
        </div>
      </div>

      {/* More Button Start */}
      {height > 112 && !show && (
        <Button
          mode="text"
          variant="success"
          type="button"
          aria-label="Read More"
          className="!px-1.5 text-sm"
          onClick={() => {
            // globalShow = true;
            setShow(true);
          }}
        >
          Read More
        </Button>
      )}
      {/* More Button End */}

      {/* Actions bar Start */}
      <div
        className={classNames(
          className.actionsBar,
          replyCount > 0 ? "justify-between" : "justify-end"
        )}
      >
        {replyCount > 0 && (
          <div className={className.actionsContainer}>
            <Button
              mode="text"
              variant="primary"
              type="button"
              aria-label={
                showReplies
                  ? `Hide ${replyCount > 1 ? "replies" : "reply"}`
                  : countConvert(replyCount, "reply", "replies")
              }
              className="!p-1 text-sm flex items-center"
              onClick={toggleReplies}
            >
              <BsChat size={20} />
              <span className="ml-2">
                {showReplies
                  ? `Hide ${replyCount > 1 ? "replies" : "reply"}`
                  : countConvert(replyCount, "reply", "replies")}
              </span>
            </Button>
          </div>
        )}
        <div className={className.actionsContainer}>
          <Button
            mode="text"
            variant="secondary"
            type="button"
            aria-label="Reply"
            className="!p-1 text-sm"
            onClick={toggleReplyEditor}
          >
            Reply
          </Button>
        </div>
      </div>
      {/* Actions bar End */}
    </section>
  );
}
