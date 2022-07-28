import { Button } from "components";
import { FormControl } from "components/account";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { IMAGE_URL_REGEX } from "utils/constants";
import Loader from "./Loader";

interface Props {
  onAdd(url: string): void;
}

const className = {
  root: "flex-1 flex flex-col items-center justify-between",
  container: "min-h-0 flex-grow flex flex-col justify-center",
};

export function Url({ onAdd }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const id = useId();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value.match(IMAGE_URL_REGEX) === null) {
      return setError(
        "Not contain the following ext. (gif, svg, jpeg, jpg, png, webp)"
      );
    }
    setError("");
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetching = async (imgUrl: string) => {
      try {
        setLoading(true);
        const { signal } = controller;
        const res = await fetch(imgUrl, {
          method: "HEAD",
          signal,
        });
        if (res.ok) {
          setError("");
        } else {
          setError("Image does not exist.");
        }
      } catch (error) {
        setError("Image does not exist.");
      } finally {
        setLoading(false);
      }
    };

    if (!error && url) {
      fetching(url);
    }

    return () => {
      controller.abort();
    };
  }, [error, url]);

  return (
    <div className={className.root}>
      <div className={className.container}>
        {loading && (
          <div className="relative h-7 w-full mb-4">
            <Loader />
          </div>
        )}
        <FormControl
          classes={{ label: "mb-0" }}
          placeholder="https://xyz.xyz/xyz.jpg"
          id={id}
          title="Image url"
          name="url"
          aria-label="Image url"
          aria-invalid={!!error}
          type="url"
          valid={!error}
          errorText={error}
          value={url}
          onChange={onChange}
          required
        />
      </div>
      <Button
        aria-label="Insert image"
        type="button"
        className="mx-3 my-3 !px-2 !py-1.5 text-sm !rounded-md"
        variant="success"
        disabled={loading || !!error || !url}
        onClick={() => {
          onAdd(url);
        }}
      >
        Insert image
      </Button>
    </div>
  );
}
