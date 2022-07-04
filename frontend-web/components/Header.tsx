import Image from "next/image";
import Link from "next/link";

const className = {
  root: "fixed top-0 left-0 right-0 bg-base-200 border-b border-secondary h-16",
  main: "mx-4 sm:mx-auto max-w-5xl flex items-center justify-between h-full",
};

export default function HomeHeader() {
  return (
    <header className={className.root}>
      <section className={className.main}>
        <Link href="/">
          <a className="flex items-center justify-center">
            <Image src="/logo.svg" alt="The Rat Diary" height={50} width={50} />
          </a>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/login">
                <a>Sign In</a>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
