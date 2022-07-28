import AddAbout from "./AddAbout";
import OtherAboutTab from "./OtherAbout";

const isTrue = false;

export default function AboutTab() {
  if (isTrue) {
    return <AddAbout />;
  }

  return <OtherAboutTab />;
}
