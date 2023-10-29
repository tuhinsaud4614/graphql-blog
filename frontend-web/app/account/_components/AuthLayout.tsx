import AuthHeader from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-base-200 pt-16">
      <AuthHeader />
      <div className="shadow-mui-hover max-h-[calc(100vh-6rem)] w-[90%] max-w-sm overflow-y-auto rounded-2xl bg-base-100 p-4">
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </section>
  );
}