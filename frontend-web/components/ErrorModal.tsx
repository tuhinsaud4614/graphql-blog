import Modal from "./modal";
import ModalHeader from "./modal/Header";
import Button from "./ui/Button";

const className = {
  title:
    "text-error selection:bg-error selection:text-base-100 text-lg font-medium flex-1 line-clamp-1 text-ellipsis pr-2 text-center",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-warning text-sm selection:bg-warning selection:text-base-100",
  footer: "px-4 py-3 flex items-center justify-end border-t",
};

interface Props {
  title: string;
  errors?: string | string[];
  onClose(): void;
}

export default function ErrorModal({ errors, onClose, title }: Props) {
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
