import PostHeader from "../_components/Header";
import HeaderContent from "./_components/HeaderContent";
import NewPostProviders from "./_components/Providers";

interface Props {
  children?: React.ReactNode;
}

export default function PostLayout({ children }: Readonly<Props>) {
  return (
    <NewPostProviders>
      <PostHeader>
        <HeaderContent />
      </PostHeader>
      <main className="bg-base-100 mx-auto mt-16 max-w-3xl">{children}</main>
    </NewPostProviders>
  );
}
