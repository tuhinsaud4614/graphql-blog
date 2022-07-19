import { ReactNode } from "react";
import { BsChat } from "react-icons/bs";

const className = {
  body: "mt-1.5 text-neutral",
  moreBtn:
    "my-1.5 text-success hover:text-success-focus text-sm active:scale-95",
  actionsBar: "flex items-center justify-between mt-3.5",
  actionsContainer: "flex items-center",
  actionBtn:
    "border-none outline-none text-neutral text-sm hover:text-accent active:scale-95 flex items-center underline",
};

interface Props {
  className?: string;
  body: string;
  children?: ReactNode;
  showReplies: boolean;
  toggleReplies?(): void;
  toggleReplyEditor?(): void;
}

export default function Body({
  className: cls,
  body,
  showReplies,
  toggleReplies,
  toggleReplyEditor,
  children,
}: Props) {
  return (
    <section className={cls}>
      <div
        className={className.body}
        dangerouslySetInnerHTML={{ __html: body }}
      />

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
      <div className={className.actionsBar}>
        {children && (
          <div className={className.actionsContainer}>
            <button
              type="button"
              aria-label={true ? "2 replies" : "Hide replies"}
              className={className.actionBtn}
              onClick={toggleReplies}
            >
              <BsChat size={20} />
              <span className="ml-2">
                {showReplies ? "Hide replies" : "2 replies"}
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
