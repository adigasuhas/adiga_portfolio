type MetricStripProps = {
  items: Array<{
    label: string;
    value: string;
  }>;
};

export function MetricStrip({ items }: MetricStripProps) {
  return (
    <section className="grid gap-px overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--border)] shadow-[0_22px_60px_-48px_rgba(8,12,22,0.7)] sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div className="bg-[color:var(--background-elevated)] px-6 py-7 sm:px-7" key={item.label}>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{item.label}</p>
          <p className="mt-4 font-serif text-3xl tracking-[-0.04em] text-[var(--foreground)]">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
