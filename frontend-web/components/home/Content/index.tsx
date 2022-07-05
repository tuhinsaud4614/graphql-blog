import { HomeWrapper } from "..";
import Sidebar from "./Sidebar";

const className = {
  root: "flex flex-col md1:flex-row-reverse",
  content: "md1:basis-full",
};

export default function Content() {
  return (
    <HomeWrapper classes={{ content: className.root }}>
      <Sidebar></Sidebar>
      <section className={className.content}>main</section>
    </HomeWrapper>
  );
}
