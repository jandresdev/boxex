import Image from "next/image"
import Link from "next/link"

export function PageIntro({
  kicker,
  title,
  description,
  image,
}: {
  kicker: string
  title: string
  description: string
  image?: string
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 lg:pb-12 lg:pt-16">
      <Link
        href="/"
        className="mb-9 inline-block text-xs text-brand-blue/60 hover:text-brand-blue hover:underline"
      >
        Inicio / {kicker}
      </Link>
      <div
        className={
          image
            ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
            : undefined
        }
      >
        <div>
          <h1 className="mb-4 max-w-3xl text-[38px] font-bold tracking-[-0.04em] text-brand-blue sm:text-[56px]">
            {title}
          </h1>
          <p className="max-w-2xl text-[17px] text-brand-blue/70">
            {description}
          </p>
        </div>
        {image && (
          <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(1,22,137,0.12)] lg:max-w-none">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
