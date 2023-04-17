import * as React from "react";

import Button from "./Button";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";

const className = {
  title:
    "text-error dark:text-error-dark text-lg font-medium flex-1 line-clamp-1 text-ellipsis pr-2 text-center",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-warning dark:text-warning-dark text-sm",
  footer:
    "px-4 py-3 flex items-center justify-end border-t dark:border-base-dark-300",
};

interface Props {
  title: string;
  errors?: string | string[];
  onClose(): void;
}

function Component({ errors, onClose, title }: Props) {
  return (
    <Modal open={!!errors} locked>
      <ModalHeader>
        <h1 className={className.title}>{title}</h1>
      </ModalHeader>
      <div className="px-4 py-3">
        {Array.isArray(errors) ? (
          <ul className={className.items}>
            {errors.map((er) => (
              <li key={er} className={className.item}>
                {er}
              </li>
            ))}
          </ul>
        ) : (
          <p className={className.item}>{errors}</p>
        )}
      </div>
      <footer className={className.footer}>
        <Button
          type="button"
          aria-label="Clear errors"
          variant="warning"
          mode="outline"
          className="!py-1 px-2 text-sm"
          onClick={onClose}
        >
          Clear errors
        </Button>
      </footer>
    </Modal>
  );
}

const ErrorModal = React.memo(
  Component,
  (prev, next) => prev.errors === next.errors,
);
export default ErrorModal;
