import Counter from "@/components/Counter";

interface Props {
  title: string;
  icon: React.ReactNode;
  value: number;
}

export default function AdminDashboardCard({ title, icon, value }: Props) {
  return (
    <div className="rounded-xl bg-secondary/5 p-6 shadow-mui transition-colors dark:bg-neutral">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center selection:bg-primary selection:text-primary-foreground">
          <h3 className="font-medium tracking-tight text-primary">{title}</h3>
          <div className="mt-2 text-2xl font-medium text-secondary">
            <Counter value={value} />
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
}
