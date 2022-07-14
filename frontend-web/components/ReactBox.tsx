import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const className = {
  reactBar:
    "z-20 fixed bottom-[4.5rem] lg:bottom-4 left-1/2 -translate-x-1/2 shadow-mine-2 bg-base-100 px-3.5 py-2 rounded-full flex items-stretch",
  reactBtn:
    "flex items-center outline-none border-none text-neutral/60 hover:text-neutral active:scale-95",
  divide: "inline-block w-0.5 bg-neutral/60 mx-4 rounded-sm",
};

interface Props {
  onLike?(): void;
  onComment?(): void;
}

export default function ReactBox({ onComment, onLike }: Props) {
  return (
    <div className={className.reactBar}>
      <button
        aria-label="Like"
        type="button"
        className={className.reactBtn}
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
        <span className="ml-1">100</span>
      </button>
      <span className={className.divide} />
      <button
        aria-label="Like"
        type="button"
        className={className.reactBtn}
        onClick={onComment}
      >
        <BsChat size={20} className="text-accent hover:text-accent-focus" />
        <span className="ml-1">100</span>
      </button>
    </div>
  );
}
