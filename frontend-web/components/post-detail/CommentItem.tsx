import Image from "next/image";
import Link from "next/link";
import { Text } from "slate";
import { ROUTES } from "utils/constants";

import escapeHtml from "escape-html";

const className = {
  root: "mx-4",
  container: "py-6 pb-4",
  header: "flex items-center justify-between",
  headerLeft: "flex items-center",
  headerImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  headerInfo: "flex flex-col justify-center",
  headerName: "text-neutral text-sm hover:text-neutral active:scale-95",
  headerTime: "text-neutral/60 text-sm",
  body: "mt-1.5 text-neutral",
};

const serialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    // @ts-ignore
    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    return string;
  }

  //   @ts-ignore
  const children = node.children.map((n) => serialize(n)).join("");
  return children;
};

interface Props {
  body: string;
}

export default function CommentItem({ body }: Props) {
  const text = JSON.parse(body);

  const result = serialize({ children: text });

  return (
    <section className={className.root}>
      <div className={className.container}>
        <header className={className.header}>
          <div className={className.headerLeft}>
            <span className={className.headerImg}>
              <Image
                src="/demo.png"
                alt="Avatar"
                width={32}
                height={32}
                layout="responsive"
                objectFit="cover"
              />
            </span>
            <div className={className.headerInfo}>
              <Link href={ROUTES.authorProfile("1")} passHref>
                <a aria-label="User profile" className={className.headerName}>
                  My name
                </a>
              </Link>
              <time className={className.headerTime}>about 5 hours ago</time>
            </div>
          </div>
        </header>
        <div
          className={className.body}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </div>
    </section>
  );
}
