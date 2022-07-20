import { useDebounce, useOnClickOutside } from "@hooks";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import {
  ComponentPropsWithRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiX } from "react-icons/bi";
import Label from "./Label";
import SelectedItem from "./SelectedItem";
import SelectItem from "./SelectItem";
import SelectItems from "./SelectItems";

const className = {
  control: "flex flex-col items-center justify-center w-full",
  box: "relative border-b w-[inherit] pb-1 flex items-center",
  boxInner: "flex-1 flex items-center flex-wrap",
  input:
    "text-neutral leading-6 min-w-0 bg-transparent outline-none mr-1 flex-auto",
  clearIcon:
    "border-none outline-none p-2 text-error hover:text-error-focus active:scale-95",
  error: "mt-2 text-sm text-error",
};

interface IOption {
  name: string;
  value: string;
}

interface Props
  extends Omit<ComponentPropsWithRef<"input">, "value" | "onChange"> {
  title: string;
  valid?: boolean;
  errorText?: ReactNode;
  classes?: {
    root?: string;
    label?: string;
    box?: string;
    boxInner?: string;
    input?: string;
    errIcon?: string;
    errText?: string;
  };
  onChangeValues?(values: IOption[]): void;
  values: IOption[];
  loadOptions: (value?: string) => Promise<IOption[]>;
}

export default function Select({
  title,
  id,
  className: cls,
  classes,
  valid = true,
  errorText,
  required,
  loadOptions,
  onChangeValues,
  values,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectedItemsRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IOption[]>([]);

  useOnClickOutside([selectedItemsRef, inputRef], () => {
    setInputValue("");
  });

  const debouncedValue = useDebounce<string>(inputValue, 300);

  useEffect(() => {
    const fetching = async () => {
      try {
        const result = await loadOptions(debouncedValue);
        setItems(result);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetching();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className={classNames(className.control, classes?.root)}>
      <Label
        htmlFor={id}
        className={classes?.label}
        valid={valid}
        required={required}
      >
        {title}
      </Label>
      <div
        className={classNames(
          className.box,
          classes?.box,
          valid ? "border-neutral" : "border-error"
        )}
      >
        <section
          className={classNames(
            className.boxInner,
            values.length && "space-x-1 space-y-1 -ml-1 -mt-1",
            classes?.boxInner
          )}
        >
          <AnimatePresence>
            {values.map((item) => (
              <SelectedItem
                key={item.value}
                onClose={() => {
                  onChangeValues &&
                    onChangeValues(
                      values.filter((prev) => prev.value !== item.value)
                    );
                }}
              >
                {item.name}
              </SelectedItem>
            ))}
          </AnimatePresence>
          <input
            {...rest}
            ref={inputRef}
            value={inputValue}
            placeholder={
              inputValue || values.length
                ? undefined
                : rest.placeholder ?? "Select..."
            }
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value && !loading) {
                setLoading(true);
              }
              setInputValue(value);
            }}
            className={classNames(className.input, classes?.input, cls)}
            id={id}
            required={required}
          />
        </section>
        <AnimatePresence>
          {!!values.length && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              aria-label="Close"
              type="button"
              className={className.clearIcon}
              onClick={onChangeValues ? () => onChangeValues([]) : undefined}
            >
              <BiX size={20} />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {inputValue && (
            <SelectItems
              length={items.length}
              loading={loading}
              ref={selectedItemsRef}
            >
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    setInputValue("");
                    onChangeValues &&
                      onChangeValues(_.uniqBy([...values, item], "value"));
                    inputRef.current?.focus();
                  }}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectItems>
          )}
        </AnimatePresence>
      </div>
      {!valid && errorText && (
        <p
          className={classNames(className.error, classes?.errText)}
          role="alert"
        >
          {errorText}
        </p>
      )}
    </div>
  );
}
