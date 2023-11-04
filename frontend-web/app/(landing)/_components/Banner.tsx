import LinkButton from "@/components/ui/LinkButton";
import { ROUTES } from "@/lib/constants";

export default function Banner() {
  return (
    <section className="border-b border-secondary bg-primary pt-24">
      <div className="flex max-w-5xl items-center px-4 sm:mx-auto">
        <div className="flex flex-col items-start justify-center pb-12">
          <h2 className="mb-8 font-title text-6xl font-semibold text-base-100 selection:bg-base-100 selection:text-primary dark:text-neutral dark:selection:bg-neutral md:text-8xl">
            Stay curious.
          </h2>
          <h3 className="mb-12 w-[80%] text-2xl leading-6 text-base-100 selection:bg-base-100 selection:text-primary dark:text-neutral dark:selection:bg-neutral">
            Discover stories, thinking, and expertise from writers on any topic.
          </h3>
          <LinkButton
            aria-label="Start reading"
            className="!py-2 px-5 text-xl capitalize"
            href={ROUTES.user.home}
            variant="secondary"
            replace
          >
            Start reading
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
