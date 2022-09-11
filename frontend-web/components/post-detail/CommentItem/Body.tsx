import { SlateViewer } from "@component";
import classNames from "classnames";
import { BsChat } from "react-icons/bs";
import { Descendant } from "slate";

const className = {
  body: "mt-1.5",
  moreBtn:
    "my-1.5 text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success text-sm active:scale-95",
  actionsBar: "flex items-center mt-3.5",
  actionsContainer: "flex items-center",
  actionBtn:
    "border-none outline-none text-neutral dark:text-neutral-dark text-sm hover:text-accent dark:hover:text-accent-dark active:scale-95 flex items-center underline",
};

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
  return (
    <section className={cls}>
      <div className={className.body}>
        <SlateViewer value={body} />
      </div>

      {/* More Button Start */}
      {false && (
        <button
          type="button"
          aria-label="Read More"
          className={className.moreBtn}
        >
          Read More
        </button>
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
            <button
              type="button"
              aria-label={true ? "2 replies" : "Hide replies"}
              className={className.actionBtn}
              onClick={toggleReplies}
            >
              <BsChat size={20} />
              <span className="ml-2">
                {showReplies
                  ? "Hide replies"
                  : replyCount > 1
                  ? `${replyCount} replies`
                  : `${replyCount} reply`}
              </span>
            </button>
          </div>
        )}
        <div className={className.actionsContainer}>
          <button
            type="button"
            aria-label="Reply"
            className={className.actionBtn}
            onClick={toggleReplyEditor}
          >
            Reply
          </button>
        </div>
      </div>
      {/* Actions bar End */}
    </section>
  );
}
