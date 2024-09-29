import PostHeader from "./_components/Header";

interface Props {
  children?: React.ReactNode;
}

export default function PostLayout({ children }: Readonly<Props>) {
  return (
    <>
      <PostHeader />
      <main className="mx-auto mt-16 max-w-3xl bg-base-100">{children}</main>
    </>
  );
}
