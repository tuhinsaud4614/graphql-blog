import LandingContentPosts from "./List";
import Sidebar from "./Sidebar";

export default function LandingContent() {
  return (
    <section className="flex max-w-5xl flex-col pb-4 sm:mx-auto md1:flex-row-reverse md1:pt-10">
      <Sidebar />
      <LandingContentPosts />
    </section>
  );
}
