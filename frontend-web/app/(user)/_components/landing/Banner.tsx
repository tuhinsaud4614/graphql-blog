import StartReading from "./StartReading";

export default function Banner() {
  return (
    <section className="border-b border-secondary bg-primary pt-24">
      <div className="flex max-w-5xl items-center px-4 sm:mx-auto">
        <div className="flex flex-col items-start justify-center pb-12">
          <h2 className="mb-8 font-quick-sand text-6xl font-semibold tracking-tight text-base-100 selection:bg-base-100 selection:text-primary md:text-8xl">
            Stay curious.
          </h2>
          <h3 className="mb-12 w-[80%] text-2xl leading-6 text-base-100 selection:bg-base-100 selection:text-primary">
            Discover stories, thinking, and expertise from writers on any topic.
          </h3>
          <StartReading />
        </div>
      </div>
    </section>
  );
}
