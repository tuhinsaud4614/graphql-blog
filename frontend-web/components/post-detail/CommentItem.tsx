import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { BsChat } from "react-icons/bs";

import { ROUTES } from "utils/constants";
import Comment from "./CommentEditor";

const className = {
  root: "mx-4",
  container: "py-6 pb-4 min-w-[9.375rem]",
  header: "flex items-center justify-between",
  headerLeft: "flex items-center",
  headerImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  headerInfo: "flex flex-col justify-center min-w-0 flex-1",
  headerName:
    "text-neutral text-sm hover:text-neutral active:scale-95 line-clamp-1 text-ellipsis",
  headerTime: "text-neutral/60 text-sm line-clamp-1 text-ellipsis",
  body: "mt-1.5 text-neutral",
  moreBtn:
    "my-1.5 text-success hover:text-success-focus text-sm active:scale-95",
  actionsBar: "flex items-center justify-between mt-3.5",
  actionsContainer: "flex items-center",
  actionBtn:
    "border-none outline-none text-neutral text-sm hover:text-accent active:scale-95 flex items-center underline",
  replyContainer: "ml-3 mb-6 border-l-[3px]",
};

type ClassesType = {
  root?: string;
  container?: string;
  header?: string;
  headerLeft?: string;
  headerImg?: string;
  headerInfo?: string;
  headerName?: string;
  headerTime?: string;
  bodyContainer?: string;
  body?: string;
  moreBtn?: string;
  actionsBar?: string;
  actionsContainer?: string;
  actionBtn?: string;
  replyContainer?: string;
};

interface Props {
  body: string;
  classes?: ClassesType;
  children?: ReactNode;
}

export default function CommentItem({ body, children, classes }: Props) {
  const [openComment, setOpenComment] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  return (
    <section className={classNames(className.root, classes?.root)}>
      <div className={classNames(className.container, classes?.container)}>
        {/* Header Start */}
        <header className={classNames(className.header, classes?.header)}>
          <div
            className={classNames(className.headerLeft, classes?.headerLeft)}
          >
            <span
              className={classNames(className.headerImg, classes?.headerImg)}
            >
              <Image
                src="/demo.png"
                alt="Avatar"
                width={32}
                height={32}
                layout="responsive"
                objectFit="cover"
              />
            </span>
            <div
              className={classNames(className.headerInfo, classes?.headerInfo)}
            >
              <Link href={ROUTES.authorProfile("1")} passHref>
                <a
                  aria-label="User profile"
                  className={classNames(
                    className.headerName,
                    classes?.headerName
                  )}
                >
                  My name
                </a>
              </Link>
              <time
                className={classNames(
                  className.headerTime,
                  classes?.headerTime
                )}
              >
                about 5 hours ago
              </time>
            </div>
          </div>
        </header>
        {/* Header End */}

        {/* Body Start */}
        <section className={classNames(classes?.bodyContainer)}>
          <div
            className={classNames(className.body, classes?.body)}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {/* Body End */}

          {/* More Button Start */}
          {false && (
            <button
              type="button"
              aria-label="Read More"
              className={classNames(className.moreBtn, classes?.moreBtn)}
            >
              Read More
            </button>
          )}
          {/* More Button End */}

          {/* Actions bar Start */}
          <div
            className={classNames(className.actionsBar, classes?.actionsBar)}
          >
            {children && (
              <div
                className={classNames(
                  className.actionsContainer,
                  classes?.actionsContainer
                )}
              >
                <button
                  type="button"
                  aria-label={true ? "2 replies" : "Hide replies"}
                  className={classNames(
                    className.actionBtn,
                    classes?.actionBtn
                  )}
                  onClick={() => setOpenComment((prev) => !prev)}
                >
                  <BsChat size={20} />
                  <span className="ml-2">
                    {openComment ? "Hide replies" : "2 replies"}
                  </span>
                </button>
              </div>
            )}
            <div
              className={classNames(
                className.actionsContainer,
                classes?.actionsContainer
              )}
            >
              <button
                type="button"
                aria-label="Reply"
                className={classNames(className.actionBtn, classes?.actionBtn)}
                onClick={() => setOpenCommentBox((prev) => !prev)}
              >
                Reply
              </button>
            </div>
          </div>
          {/* Actions bar End */}
        </section>
      </div>

      {/* Replies start */}
      {(openComment || openCommentBox) && (
        <section
          className={classNames(
            className.replyContainer,
            classes?.replyContainer
          )}
        >
          {openCommentBox && (
            <Comment
              commentBoxClassName="w-[17.5rem] mt-1"
              expanded={true}
              onHide={() => setOpenCommentBox(false)}
            />
          )}
          {openComment && children}
        </section>
      )}
      {/* Replies End */}
    </section>
  );
}
