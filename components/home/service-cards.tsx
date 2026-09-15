import { Reveal } from "./reveal"
import { ServiceCarousel } from "./service-carousel"

export function ServiceCardsSection() {
  return (
    <section className="mx-auto max-w-6xl overflow-x-hidden px-6 py-[66px] sm:py-20 lg:py-[110px]">
      <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="mb-5 block text-[13px] font-medium text-brand-blue">
            Encuentra tu forma de enviar
          </span>
          <h2 className="text-[35px] font-bold tracking-[-0.048em] text-brand-blue lg:text-[49px]">
            Para cada conexión,
            <br />
            una solución.
          </h2>
        </div>
        <p className="max-w-[390px] text-[15px] text-brand-blue/70 lg:text-base">
          De una compra online a una caja para tu familia.
          <br />
          Arrastra o usa las flechas para ver cada una.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <ServiceCarousel />
      </Reveal>
    </section>
  )
}
