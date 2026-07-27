import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import * as FadeIn from "@/components/motion/staggers/fade";
import { WorkSection } from "@/components/work-section";

const Spacer = () => <div className="mt-6" />;

const experiences = [
  {
    period: "2026–Present",
    role: "Founder & Creative Director",
    company: "Narra Creations",
  },
  {
    period: "2022–Present",
    role: "Founder & Full-Stack Developer",
    company: "Orrin Studious",
  },
  {
    period: "2025–Present",
    role: "Campus Organizer",
    company: "Google Developer Student Clubs – Cebu Technological University",
  },
  {
    period: "2026",
    role: "Systems & Infrastructure Optimization Manager",
    company: "Mysterious Adventures Tours",
  },
];

export default function Home() {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1>Tyrone Tabornal</h1>
            <h2>Founder, product builder, and full-stack developer</h2>
          </div>

          <Image
            src="/avatar.png"
            alt="Tyrone Tabornal"
            width={64}
            height={64}
            draggable={false}
            className="h-14 w-14 shrink-0 select-none rounded-full object-cover [-webkit-user-drag:none] sm:h-16 sm:w-16"
          />
        </div>
      </FadeIn.Item>

      <Spacer />

      <FadeIn.Item>
        <p>I&apos;m a founder and product builder based in Cebu, Philippines.</p>

        <p>
          I enjoy turning complex problems into simple, useful digital products. My work sits across software, design, AI, fintech, and community-driven
          technology, with a strong focus on the details that shape how people experience a product.
        </p>

        <p>
          I&apos;ve built projects such as{" "}
          <a
            href="https://canva.link/gzdhxd5qp2g913v"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-gray-a4 underline-offset-2 hover:opacity-100"
          >
            <Image
              src="/structsure_icon.png"
              alt=""
              width={18}
              height={18}
              draggable={false}
              className="size-[18px] shrink-0 select-none object-contain [-webkit-user-drag:none]"
            />
            StructSure
          </a>
          , Modulyn,{" "}
          <a
            href="https://canva.link/wattkoop-deck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-gray-a4 underline-offset-2 hover:opacity-100"
          >
            <Image
              src="/wattkoop_icon.png"
              alt=""
              width={18}
              height={18}
              draggable={false}
              className="size-[18px] shrink-0 select-none object-contain [-webkit-user-drag:none]"
            />
            WattKoop
          </a>
          , GotCHW, Circulo, and Malaya Invoice, while also contributing to developer communities across Cebu.
        </p>

        <p className="inline-flex items-center gap-1">
          <Image
            src="/frontly_icon.jpg"
            alt=""
            width={18}
            height={18}
            draggable={false}
            className="size-[18px] shrink-0 select-none rounded-small object-cover [-webkit-user-drag:none]"
          />
          Currently working on Frontly
        </p>

        <p>
          You can reach me through{" "}
          <a
            aria-label="GitHub"
            href="https://github.com/Nesqyk"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 underline decoration-gray-a4 underline-offset-2 hover:opacity-100"
          >
            <Github aria-hidden="true" size={14} />
            GitHub
          </a>
          ,{" "}
          <a
            aria-label="LinkedIn"
            href="https://linkedin.com/in/tyrone-tabornal-738984274/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 underline decoration-gray-a4 underline-offset-2 hover:opacity-100"
          >
            <Linkedin aria-hidden="true" size={14} />
            LinkedIn
          </a>
          , or{" "}
          <a
            aria-label="Email"
            href="mailto:tyronetabornal@gmail.com"
            className="inline-flex items-center gap-1 underline decoration-gray-a4 underline-offset-2 hover:opacity-100"
          >
            <Mail aria-hidden="true" size={14} />
            email
          </a>
          .
        </p>
      </FadeIn.Item>

      <section aria-labelledby="experience-heading" className="mt-6">
        <FadeIn.Item>
          <h3 id="experience-heading" className="text-muted">
            Experience
          </h3>
        </FadeIn.Item>

        <div className="mt-2 grid grid-cols-1 border-border border-t sm:grid-cols-2">
          {experiences.map((experience, index) => (
            <FadeIn.Item key={`${experience.company}-${experience.role}`}>
              <div
                className={[
                  "grid h-full min-h-[104px]",
                  "grid-cols-[7rem_minmax(0,1fr)]",
                  "items-start gap-x-4",
                  "border-border border-b py-3 text-small",
                  "sm:h-[132px] sm:min-h-0",
                  index % 2 === 0 ? "sm:border-r sm:pr-4" : "sm:pl-4",
                ].join(" ")}
              >
                <span className="whitespace-nowrap text-muted leading-snug">{experience.period}</span>

                <div className="min-w-0">
                  <span className="block font-medium leading-snug">{experience.role}</span>

                  <span className="mt-1 block text-muted leading-snug">{experience.company}</span>
                </div>
              </div>
            </FadeIn.Item>
          ))}
        </div>
      </section>

      <WorkSection />

      <Spacer />
    </FadeIn.Container>
  );
}
