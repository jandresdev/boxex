import Link from "next/link"

export function PageIntro({
  kicker,
  title,
  description,
}: {
  kicker: string
  title: string
  description: string
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 lg:pb-12 lg:pt-16">
      <Link
        href="/"
        className="mb-9 inline-block text-xs text-brand-blue/60 hover:text-brand-blue hover:underline"
      >
        Inicio / {kicker}
      </Link>
      <h1 className="mb-4 max-w-3xl text-[38px] font-bold tracking-[-0.04em] text-brand-blue sm:text-[56px]">
        {title}
      </h1>
      <p className="max-w-2xl text-[17px] text-brand-blue/70">{description}</p>
    </section>
  )
}
