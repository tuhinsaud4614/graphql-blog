const className = {
  root: "hidden lg:block min-h-screen w-[17.5rem] xl:w-96 border-l relative",
  container: "h-screen sticky inset-0 z-10 px-4",
};

export default function Sidebar() {
  return (
    <aside className={className.root}>
      <section className={className.container}>sidebar</section>
    </aside>
  );
}
