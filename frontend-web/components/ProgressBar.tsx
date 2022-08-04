import classNames from "classnames";

export default function ProgressBar({ className }: { className?: string }) {
  return (
    <div className={classNames(className)}>
      <div className="h-2.5 bg-[length:300%_100%] bg-progress animate-progress-bar" />
    </div>
  );
}
