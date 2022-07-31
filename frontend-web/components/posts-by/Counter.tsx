import Image from "next/image";

const className = {
  root: "pt-4 flex items-center flex-wrap md:hidden",
  left: "max-w-[5.5rem] mr-4",
  avatars: "list-none flex items-center -space-x-2.5",
  avatar:
    "shrink-0 h-9 w-9 ring-2 ring-base-300 dark:ring-base-dark-300 rounded-full relative",
  right: "flex items-center",
};

export default function TagCounter() {
  return (
    <div className={className.root}>
      <div className={className.left}>
        <ul className={className.avatars}>
          {Array.from({ length: 3 }).map((_, index) => (
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
      <div className={className.right}>
        <div className="flex items-center pr-2">
          <span className="pr-1 text-neutral dark:text-neutral-dark">3.5K</span>
          <span className="text-neutral/60 dark:text-neutral-dark/60">
            Posts
          </span>
        </div>
        <div className="flex items-center">
          <span className="pr-1 text-neutral dark:text-neutral-dark">2.2K</span>
          <span className="text-neutral/60 dark:text-neutral-dark/60">
            Authors
          </span>
        </div>
      </div>
    </div>
  );
}
