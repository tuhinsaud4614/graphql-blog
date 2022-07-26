import { FormControl } from "components/account";
import { ChangeEvent, useId, useState } from "react";
import { URL_REGEX } from "utils/constants";
import InsertButton from "../ImageButton/InsertButton";

interface Props {
  title?: string;
  onAdd(url: string): void;
}

const className = {
  root: "flex flex-col items-center justify-between",
};

export function Url({ onAdd, title = "Embeds url" }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const id = useId();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (!URL_REGEX.test(value)) {
      return setError("Not a valid url");
    }
    setError("");
  };

  return (
    <div className={className.root}>
      <FormControl
        classes={{ label: "mb-0" }}
        placeholder="https://xyz.com/video"
        id={id}
        title={title}
        name="url"
        aria-label="Video url"
        aria-invalid={!!error}
        type="url"
        valid={!error}
        errorText={error}
        value={url}
        onChange={onChange}
        required
      />
      <InsertButton
        disabled={!!error || !url}
        onClick={() => {
          onAdd(url);
        }}
      />
    </div>
  );
}
