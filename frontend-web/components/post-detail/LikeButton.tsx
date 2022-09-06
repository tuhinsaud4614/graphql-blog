import { selectReact, setToggleReact } from "@features";
import { useTooltip } from "@hooks";
import classNames from "classnames";
import { useReactToPostMutation } from "graphql/generated/schema";
import { useRouter } from "next/router";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "store";
import { countConvert } from "utils";

const className = {
  like: "flex items-center",
  likeBtn:
    "outline-none border-none text-neutral dark:text-neutral-dark active:scale-95",
  textBtn:
    "flex items-center outline-none border-none text-neutral/60 dark:text-neutral-dark/60 hover:text-neutral dark:hover:text-neutral-dark active:scale-95",
};

interface Props {
  onLikeText?(): void;
  className?: string;
}

export default function LikeButton({ className: cls, onLikeText }: Props) {
  const { count, isReacted } = useAppSelector(selectReact);
  const rdxDispatch = useAppDispatch();
  const {
    query: { postId },
  } = useRouter();
  const { onHoverEnd, onHoverStart } = useTooltip();

  const [reactAction, { loading }] = useReactToPostMutation({
    notifyOnNetworkStatusChange: true,
  });

  const likeHandler = async () => {
    try {
      await reactAction({ variables: { toId: postId as string } });
      rdxDispatch(setToggleReact());
    } catch (error) {}
  };

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
        onClick={likeHandler}
        disabled={loading}
      >
        {isReacted ? (
          <AiFillLike
            size={24}
            className="text-secondary dark:text-secondary-dark hover:text-secondary-focus dark:hover:text-secondary"
          />
        ) : (
          <AiOutlineLike
            className="hover:text-secondary dark:hover:text-secondary-dark"
            size={24}
          />
        )}
      </button>
      <button
        aria-label="Liker list"
        onClick={onLikeText}
        className={classNames(className.textBtn, "ml-1")}
      >
        {countConvert(count)}
      </button>
    </span>
  );
}
