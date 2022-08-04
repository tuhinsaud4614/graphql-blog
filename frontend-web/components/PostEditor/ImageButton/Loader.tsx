import { ImSpinner2 } from "react-icons/im";

const className = {
  btnLoader:
    "absolute z-20 inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 rounded-md border border-dashed",
  btnSpin:
    "animate-spin ml-2 text-sm text-warning-content dark:text-warning-dark",
};

export default function Loader() {
  return (
    <span className={className.btnLoader}>
      <ImSpinner2 size={24} className={className.btnSpin} />
    </span>
  );
}
