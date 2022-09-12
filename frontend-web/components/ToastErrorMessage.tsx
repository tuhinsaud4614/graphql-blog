interface Props {
  error: string | string[];
}

export default function ToastErrorMessage({ error }: Props) {
  if (typeof error === "string") {
    return <p className="text-error dark:text-error-dark">{error}</p>;
  }
  return (
    <div className="flex flex-col space-y-2 text-error dark:text-error-dark">
      {error.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
