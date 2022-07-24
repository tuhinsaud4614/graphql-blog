import { FormControl } from "components/account";
import { useId, useState } from "react";
import { IMAGE_URL_REGEX } from "utils/constants";
import InsertButton from "./InsertButton";

interface Props {
  onAdd(url: string): void;
}

const className = {
  root: "flex flex-col items-center justify-between",
};

export function Url({ onAdd }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const id = useId();
  return (
    <div className={className.root}>
      <FormControl
        classes={{ label: "mb-0" }}
        id={id}
        title="Image url"
        name="url"
        aria-label="Image url"
        aria-invalid={!!error}
        type="url"
        valid={!error}
        errorText={error}
        value={url}
        onChange={(e) => {
          const value = e.target.value;
          setUrl(value);
          if (!value.match(IMAGE_URL_REGEX)) {
            return setError(
              "Not contain the following ext. (gif, svg, jpeg, jpg, png, webp)"
            );
          }
          setError("");
        }}
      />
      <InsertButton
        disabled={!!error || !url}
        onClick={() => {
          !error && url && onAdd(url);
        }}
      />
    </div>
  );
}
