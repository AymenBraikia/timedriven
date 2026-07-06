import Link from "next/link";

export type RoutePageProps = {
    title: string;
    intro: string;
    bullets?: string[];
    ctaLabel?: string;
    ctaHref?: string;
};

export default function RoutePage({ title, intro, bullets = [], ctaLabel = "Back to home", ctaHref = "/" }: RoutePageProps) {
    return (
        <main className="min-h-screen w-full bg-background px-4 py-20 text-foreground md:px-8 lg:px-16">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/30 md:p-12">
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Timedriven</p>
                    <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
                    <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{intro}</p>
                </div>

                {bullets.length > 0 ? (
                    <ul className="grid gap-3 rounded-2xl border border-black/10 bg-background/70 p-6 dark:border-white/10">
                        {bullets.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground sm:text-base">
                                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : null}

                <div className="flex flex-wrap gap-4">
                    <Link href={ctaHref} className="rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background">
                        {ctaLabel}
                    </Link>
                    <Link href="/contact" className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90">
                        Contact us
                    </Link>
                </div>
            </div>
        </main>
    );
}
