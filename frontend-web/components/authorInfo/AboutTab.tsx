import OtherAboutTab from "./OtherAboutTab";

const isTrue = false;

export default function AboutTab() {
  if (isTrue) {
    return <div></div>;
  }

  return <OtherAboutTab />;
}
