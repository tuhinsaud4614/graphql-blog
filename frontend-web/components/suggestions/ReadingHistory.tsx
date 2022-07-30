import { Button } from "components";

const className = {
  root: "mt-6",
  clearCard:
    "p-6 mb-10 flex items-center justify-between bg-base-200 dark:bg-base-dark-200 rounded-sm",
  clearCardText: "text-sm text-neutral dark:text-neutral-dark mr-4",
  clearCardBtn: "text-sm !px-3 !py-1.5 shrink-0",
};

export default function ReadingHistory() {
  return (
    <div className={className.root}>
      <ClearCard />
    </div>
  );
}

function ClearCard() {
  return (
    <div className={className.clearCard}>
      <p className={className.clearCardText}>
        You can clear your reading history for a fresh start.
      </p>
      <Button
        aria-label="Clear history"
        type="button"
        variant="error"
        className={className.clearCardBtn}
      >
        Clear History
      </Button>
    </div>
  );
}
