import { Button, Modal, ModalHeader } from "components";
import { Fragment, useState } from "react";
import HistoryPost from "./HistoryPost";

const className = {
  root: "mt-6",
  clearCard:
    "p-6 mb-10 flex items-center justify-between bg-base-200 dark:bg-base-dark-200 rounded-sm",
  clearCardText: "text-sm text-neutral dark:text-neutral-dark mr-4",
  clearCardBtn: "text-sm !px-3 !py-1.5 shrink-0",
  items: "flex flex-col list-none",
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
  modalBody: "px-14 pb-11 flex flex-col justify-center items-center",
  modalBodyTitle:
    "font-medium text-[1.375rem] md:text-[1.875rem] leading-7 md:leading-9 text-neutral dark:text-neutral-dark",
  modalBodyText:
    "pt-1.5 pb-9 text-sm md:text-base text-neutral/60 dark:text-neutral-dark/60 text-center",
};

export default function ReadingHistory() {
  return (
    <div className={className.root}>
      <ClearCard />
      <ul className={className.items}>
        {Array.from({ length: 5 }).map((_, index) => (
          <HistoryPost
            key={index}
            classes={{
              root: className.item,
            }}
          />
        ))}
      </ul>
    </div>
  );
}

function ClearCard() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <Fragment>
      <div className={className.clearCard}>
        <p className={className.clearCardText}>
          You can clear your reading history for a fresh start.
        </p>
        <Button
          aria-label="Clear history"
          type="button"
          variant="error"
          className={className.clearCardBtn}
          onClick={() => setOpenModel(true)}
        >
          Clear History
        </Button>
      </div>
      <Modal
        open={openModel}
        onHide={() => {
          setOpenModel(false);
        }}
      >
        <ModalHeader
          onClose={() => setOpenModel(false)}
          className="border-none"
        />
        <div className={className.modalBody}>
          <h2 className={className.modalBodyTitle}>Clear reading history</h2>
          <p className={className.modalBodyText}>
            The stories that are cleared will no longer influence the
            recommendations that you receive in your feed
          </p>
          <div className="flex items-center">
            <Button
              aria-label="Cancel"
              type="button"
              onClick={() => setOpenModel(false)}
              className="text-sm mr-2"
              variant="neutral"
              mode="outline"
            >
              Cancel
            </Button>
            <Button
              aria-label="Confirm and clear"
              type="button"
              onClick={() => {}}
              className="text-sm"
              variant="error"
            >
              Confirm and clear
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
