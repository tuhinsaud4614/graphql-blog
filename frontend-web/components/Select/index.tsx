import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { BiX } from "react-icons/bi";

import { useDebounce, useOnClickOutside } from "@/hooks";
import { cn } from "@/utils";

import Label from "./Label";
import SelectItem from "./SelectItem";
import SelectItems from "./SelectItems";
import SelectedItem from "./SelectedItem";

const className = {
  control: "flex flex-col items-center justify-center w-full",
  box: "relative border-b dark:border-base-dark-300 w-[inherit] pb-1 flex items-center",
  boxInner: "flex-1 flex items-center flex-wrap",
  input:
    "text-neutral dark:text-neutral-dark leading-6 min-w-0 bg-transparent outline-none mr-1 flex-auto",
  clearIcon:
    "border-none outline-none p-2 text-error dark:text-error-dark hover:text-error-focus dark:hover:text-error active:scale-95",
  error: "mt-2 text-sm text-error dark:text-error-dark",
};

interface IOption {
  name: string;
  value: string;
}

interface Props
  extends Omit<React.ComponentPropsWithRef<"input">, "value" | "onChange"> {
  title: string;
  valid?: boolean;
  errorText?: React.ReactNode;
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
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const selectedItemsRef = React.useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState<IOption[]>([]);

  useOnClickOutside([selectedItemsRef, inputRef], () => {
    setInputValue("");
  });

  const debouncedValue = useDebounce<string>(inputValue, 300);

  React.useEffect(() => {
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
    <div className={cn(className.control, classes?.root)}>
      <Label
        htmlFor={id}
        className={classes?.label}
        valid={valid}
        required={required}
      >
        {title}
      </Label>
      <div
        className={cn(
          className.box,
          classes?.box,
          valid
            ? "border-neutral dark:text-neutral-dark"
            : "border-error dark:border-neutral-dark",
        )}
      >
        <section
          className={cn(
            className.boxInner,
            values.length && "-ml-1 -mt-1 space-x-1 space-y-1",
            classes?.boxInner,
          )}
        >
          <AnimatePresence>
            {values.map((item) => (
              <SelectedItem
                key={item.value}
                onClose={() => {
                  onChangeValues &&
                    onChangeValues(
                      values.filter((prev) => prev.value !== item.value),
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
            className={cn(className.input, classes?.input, cls)}
            id={id}
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
        <p className={cn(className.error, classes?.errText)} role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}
