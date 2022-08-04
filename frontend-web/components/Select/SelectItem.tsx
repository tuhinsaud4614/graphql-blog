const className = {
  root: "block",
  btn: "block w-full px-3 py-1.5 text-sm text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-base-dark-100 hover:bg-base-200/50 dark:hover:bg-base-dark-300 text-start",
  unSelected:
    "block w-full px-3 py-1.5 text-sm text-neutral/60 dark:text-neutral-dark/60 text-center",
};

interface Props {
  onSelect(): void;
  value: string;
  children: string;
}

export function UnSelectedItem({ children }: { children: string }) {
  return <li className={className.unSelected}>{children}</li>;
}

export default function SelectItem({ onSelect, value, children }: Props) {
  return (
    <li className={className.root}>
      <button
        aria-label="Item"
        type="button"
        className={className.btn}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
