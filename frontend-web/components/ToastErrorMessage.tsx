"use client";

interface Props {
  error: string | string[];
}

export default function ToastErrorMessage({ error }: Props) {
  if (typeof error === "string") {
    return <p className="text-error">{error}</p>;
  }
  return (
    <div className="flex flex-col space-y-2 text-error">
      {error.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
