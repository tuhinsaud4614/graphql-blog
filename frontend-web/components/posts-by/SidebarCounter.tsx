import Image from "next/image";

const className = {
  root: "flex flex-col",
  top: "flex",
  topItem: "flex flex-col flex-grow shrink-0 basis-auto",
  topTotal: "text-[1.375rem] font-bold text-neutral dark:text-neutral-dark",
  topType: "mt-2.5 text-neutral dark:text-neutral-dark",
  bottom: "w-[27rem] max-w-full mt-4 overflow-hidden",
  avatars: "list-none grid grid-cols-[repeat(12,_7.69%)] p-2 -ml-2",
  avatar:
    "shrink-0 h-9 w-9 ring-2 ring-base-300 dark:ring-base-dark-300 rounded-full relative",
};

export default function SidebarCounter() {
  return (
    <div className={className.root}>
      <div className={className.top}>
        <div className={className.topItem}>
          <span className={className.topTotal}>3.5K</span>
          <span className={className.topType}>Posts</span>
        </div>
        <div className={className.topItem}>
          <span className={className.topTotal}>2.2K</span>
          <span className={className.topType}>Authors</span>
        </div>
      </div>
      <div className={className.bottom}>
        <ul className={className.avatars}>
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index} className={className.avatar}>
              <Image
                src="/demo.png"
                alt="Avatar"
                width={36}
                height={36}
                objectFit="cover"
                layout="responsive"
                className="rounded-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
