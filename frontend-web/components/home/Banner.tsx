const className = {
  banner: "bg-primary pt-16 border-b border-secondary",
  bannerContent: "px-4 sm:mx-auto max-w-5xl flex items-center",
  left: "flex flex-col justify-center items-start pb-12",
  title: "text-[5.3125rem] md:text-[6.625rem] text-base-100 mb-8",
  subtitle: "text-2xl text-base-100 mb-12 w-[80%] leading-6",
  btn: "outline-none border-0 px-5 py-2 rounded-full text-xl inline-block bg-accent text-neutral hover:text-neutral-focus active:scale-95",
};

export default function Banner() {
  return (
    <section className={className.banner}>
      <div className={className.bannerContent}>
        <div className={className.left}>
          <h2 className={className.title}>Stay curious.</h2>
          <h3 className={className.subtitle}>
            Discover stories, thinking, and expertise from writers on any topic.
          </h3>
          <button aria-label="Start reading" className={className.btn}>
            Start reading
          </button>
        </div>
      </div>
    </section>
  );
}
