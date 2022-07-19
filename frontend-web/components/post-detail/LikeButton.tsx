import { useTooltip } from "@hooks";
import classNames from "classnames";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const className = {
  like: "flex items-center",
  likeBtn: "outline-none border-none active:scale-95",
  textBtn:
    "flex items-center outline-none border-none text-neutral/60 hover:text-neutral active:scale-95",
};

interface Props {
  onLike?(): void;
  onLikeText?(): void;
  count: number;
  className?: string;
}

export default function LikeButton({
  className: cls,
  onLike,
  onLikeText,
  count,
}: Props) {
  const { onHoverEnd, onHoverStart } = useTooltip();
  return (
    <span
      className={classNames(cls, className.like)}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: "View Likes",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-3 py-2",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
    >
      <button
        aria-label="Like"
        type="button"
        className={className.likeBtn}
        onClick={onLike}
      >
        {false ? (
          <AiFillLike
            size={24}
            className="text-secondary hover:text-secondary-focus"
          />
        ) : (
          <AiOutlineLike className="hover:text-secondary" size={24} />
        )}
      </button>
      <button
        aria-label="Liker list"
        onClick={onLikeText}
        className={classNames(className.textBtn, "ml-1")}
      >
        {count}
      </button>
    </span>
  );
}
