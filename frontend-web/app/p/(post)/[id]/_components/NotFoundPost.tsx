import LinkTextButton from "@/components/ui/LinkTextButton";
import { ROUTES } from "@/lib/constants";

import RecommendationList from "../(detail)/_components/RecommendationList";

export default function NotFoundPost() {
  return (
    <div className="p-4 md1:p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="dark:text-neutral-dark mb-4 text-sm uppercase tracking-wider text-neutral">
          PAGE NOT FOUND
        </h1>

        <div className="dark:text-neutral-dark font-post-title text-9xl leading-none text-neutral">
          404
        </div>

        <h2 className="mb-4 mt-8 font-serif text-4xl md:text-5xl">
          Out of nothing, something.
        </h2>

        <p className="dark:text-neutral-dark mx-auto mb-4 max-w-3xl text-xl text-neutral">
          You can find (just about) anything on RAT Blog — apparently even a
          page that doesn&apos;t exist. Maybe these posts will take you
          somewhere new?
        </p>
        <LinkTextButton href={ROUTES.user.home} className="mx-auto w-fit">
          Home
        </LinkTextButton>
      </div>
      <RecommendationList />
    </div>
  );
}
