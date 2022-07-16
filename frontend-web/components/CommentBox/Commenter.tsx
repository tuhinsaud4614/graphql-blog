import Image from "next/image";

const className = {
  header: "px-3.5 mb-1.5 flex items-center",
  img: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  name: "text-neutral text-sm",
};

export default function Commenter() {
  return (
    <div className={className.header}>
      <span className={className.img}>
        <Image
          src="/demo.png"
          alt="Avatar"
          width={32}
          height={32}
          layout="responsive"
          objectFit="cover"
        />
      </span>
      <p className={className.name}>My Name</p>
    </div>
  );
}
