"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const email = "armaanmirpuri@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/armaan-mirpuri-3607a7251/";
const resumeUrl = "/armaan-mirpuri-resume.pdf";

const navItems = [
  "About",
  "Trading",
  "Skills",
  "Focus Areas",
  "Experience",
  "Education",
  "Resume",
  "Contact"
];

const quickFacts = [
  ["School", "UT Knoxville, Haslam College of Business"],
  ["Studying", "Business Analytics"],
  ["Background", "Operations, sales analysis, and financial markets"],
  ["Based", "Miami, FL and Knoxville, TN"]
];

const skills = {
  "Business & Analytics": [
    "Excel",
    "Market research",
    "Business analytics",
    "Data analysis",
    "Sales reporting"
  ],
  "Trading & Markets": [
    "TradingView",
    "Futures trading",
    "Risk management",
    "Crypto investing",
    "Rules-based execution"
  ],
  "Professional Tools": [
    "SharePoint",
    "Project management",
    "Word",
    "HTML",
    "CSS"
  ],
  "Professional Strengths": [
    "Discipline",
    "Consistency under pressure",
    "Accountability",
    "Structured decision-making"
  ]
};

const focusAreas = [
  {
    title: "Trading Journal and Review",
    description:
      "Getting better at reviewing decisions after the trade, not just judging the result."
  },
  {
    title: "Market and Economic Research",
    description:
      "Following the reports, headlines, and market conditions that can change how futures trade."
  },
  {
    title: "Risk Rules",
    description:
      "Keeping the focus on position sizing, loss limits, and not letting one bad decision turn into five."
  },
  {
    title: "Business Analytics in Practice",
    description:
      "Using Excel, research, and clear reporting to make messy business information easier to act on."
  }
];

const experiences = [
  {
    company: "Financial Markets & Futures Trading",
    role: "Independent Trader",
    date: "2024 - Present",
    details: [
      "Develop and follow structured trading plans focused on risk management and consistency.",
      "Trade futures markets using a disciplined, rules-based approach.",
      "Operate within prop firm-style rules, including drawdown limits and performance targets.",
      "Review trading performance to identify mistakes, improve execution, and support long-term growth."
    ]
  },
  {
    company: "Peerislands",
    role: "Operations Intern (Remote)",
    date: "June 2024 - September 2024",
    details: [
      "Audited company SaaS subscriptions to assess usage, identify redundancies, and recommend cost-saving measures.",
      "Created data migration strategies to support smoother transitions between systems while protecting data integrity.",
      "Supported project planning, scope definition, progress tracking, and risk management across cross-functional work.",
      "Used SharePoint, Word, and Excel for documentation, collaboration, reporting, data analysis, and project tracking."
    ]
  },
  {
    company: "Princess World Jewelers",
    role: "Part-Time Sales Associate and Analyst",
    date: "September 2019 - August 2022",
    details: [
      "Analyzed customer volume and cruise ship schedules to help establish weekly sales targets.",
      "Supported inventory management, restocking, and documentation of sold products.",
      "Interpreted market research and customer feedback to improve product placement and showcase design.",
      "Prepared sales reports and presentations for management review, highlighting top products and inventory insights."
    ]
  }
];

const education = [
  {
    school: "University of Tennessee, Knoxville",
    location: "Knoxville, Tennessee",
    dates: "May 2025 - May 2027",
    details: [
      "Business Analytics",
      "Incoming Junior",
      "Haslam College of Business",
      "Club: Indian American Association"
    ]
  }
];

const coursework = [
  "Business analytics",
  "Financial markets",
  "Market research",
  "Microeconomics",
  "Data-driven decision-making",
  "Project management"
];

const storyPoints = [
  "At Princess World Jewelers, I learned how much business depends on timing, traffic, inventory, and how people actually make buying decisions.",
  "At Peerislands, I worked behind the scenes on SaaS audits, migrations, documentation, and project tracking.",
  "In trading, I am learning that consistency is less about predicting every move and more about protecting your decision-making process."
];

function sectionId(item: string) {
  return item.toLowerCase().replaceAll(" ", "-");
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ? stored === "dark" : prefersDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggle() {
    const next = !isDark;
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-lg font-semibold text-ink transition hover:border-ink/35 dark:border-white/20 dark:text-paper dark:hover:border-white/45"
      type="button"
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setError("Name, email, and message are required.");
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setStatus("error");
      setError(body.error || "Something went wrong. Please try again.");
      return;
    }

    event.currentTarget.reset();
    setStatus("sent");
  }

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      <input
        className="hidden"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {["name", "email", "company"].map((field) => (
        <label key={field} className="grid gap-2 text-sm font-semibold">
          <span className="capitalize">{field}</span>
          <input
            required={field !== "company"}
            type={field === "email" ? "email" : "text"}
            name={field}
            autoComplete={field === "email" ? "email" : "on"}
            className="rounded-lg border border-ink/15 bg-white/80 px-4 py-3 text-ink outline-none transition focus:border-emerald-600 dark:border-white/15 dark:bg-white/5 dark:text-paper"
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-semibold">
        <span>Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-lg border border-ink/15 bg-white/80 px-4 py-3 text-ink outline-none transition focus:border-emerald-600 dark:border-white/15 dark:bg-white/5 dark:text-paper"
        />
      </label>
      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
      {status === "sent" ? (
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Thanks. Your message was received.
        </p>
      ) : null}
      <button
        disabled={status === "sending"}
        className="rounded-lg bg-ink px-5 py-3 font-semibold text-paper transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-paper dark:text-ink"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function PortfolioPage() {
  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1117]/85">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-4 md:py-4">
          <div className="hidden items-center gap-5 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${sectionId(item)}`}
                className="text-ink/70 transition hover:text-ink dark:text-paper/70 dark:hover:text-paper"
              >
                {item}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </nav>
        <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-5 py-3 text-sm font-semibold md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${sectionId(item)}`}
              className="whitespace-nowrap text-ink/70 transition hover:text-ink dark:text-paper/70 dark:hover:text-paper"
            >
              {item}
            </a>
          ))}
        </div>
      </header>

      <section
        id="home"
        className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="animate-rise">
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&apos;m Armaan.
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold text-ink/72 dark:text-paper/72">
            I study Business Analytics at UT Knoxville and spend a lot of time
            thinking about markets, risk, and how to make better decisions with
            imperfect information.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/68 dark:text-paper/68">
            My experience so far has been a mix of retail sales analysis,
            operations work, project tracking, and futures trading. I care about
            understanding how decisions are made, how risk is managed, and how
            small improvements can compound over time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#trading"
              className="rounded-lg bg-ink px-5 py-3 font-semibold text-paper transition hover:translate-y-[-1px] dark:bg-paper dark:text-ink"
            >
              Trading
            </a>
            <a
              href={resumeUrl}
              download
              className="rounded-lg border border-ink/15 px-5 py-3 font-semibold transition hover:border-ink/35 dark:border-white/20 dark:hover:border-white/45"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-ink/15 px-5 py-3 font-semibold transition hover:border-ink/35 dark:border-white/20 dark:hover:border-white/45"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-lg border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55 dark:text-paper/55">
            Quick Notes
          </p>
          <div className="mt-6 grid gap-5">
            {quickFacts.map(([label, value]) => (
              <div key={label} className="border-b border-ink/10 pb-4 last:border-0 last:pb-0 dark:border-white/10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                  {label}
                </p>
                <p className="mt-1 text-lg font-black leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-ink/10 bg-white/55 py-20 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-4xl font-black tracking-tight">About</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-ink/70 dark:text-paper/70">
            <p>
              I&apos;m a Business Analytics student at the University of Tennessee,
              Knoxville. My interest sits where business, finance, analytics,
              and practical tools meet.
            </p>
            <p>
              I&apos;ve worked in customer-facing sales, inventory support,
              operations, SaaS audits, data migration planning, and project
              tracking. Trading is another part of that same pattern for me:
              take in information, manage risk, stay calm, and review what
              happened honestly.
            </p>
            <div className="grid gap-3 pt-2">
              {storyPoints.map((point) => (
                <p
                  key={point}
                  className="rounded-lg border border-ink/10 bg-paper p-4 text-base leading-7 dark:border-white/10 dark:bg-[#0d1117]"
                >
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="trading" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight">Trading</h2>
          <p className="mt-4 text-lg leading-8 text-ink/68 dark:text-paper/68">
            I&apos;m still developing as a trader, so I don&apos;t want to
            oversell it. The important part is the mindset: protect capital,
            follow rules, and learn from the trades where the process broke
            down.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Discipline", "The plan matters most when the market is moving fast."],
            ["Risk", "A good setup is not useful if the downside is ignored."],
            ["Review", "The trade is not over when it closes. The review is where the lesson is."]
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-lg border border-ink/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-ink/68 dark:text-paper/68">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className="border-y border-ink/10 bg-white/55 py-20 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight">Skills</h2>
            </div>
            <p className="max-w-xl text-ink/65 dark:text-paper/65">
              A practical mix from school, internships, sales work, and trading.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <article
                key={group}
                className="rounded-lg border border-ink/10 bg-paper p-5 dark:border-white/10 dark:bg-[#0d1117]"
              >
                <h3 className="font-black">{group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-ink/10 px-3 py-1 text-sm font-semibold text-ink/70 dark:border-white/10 dark:text-paper/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="focus-areas" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight">Focus Areas</h2>
          <p className="mt-4 text-lg leading-8 text-ink/68 dark:text-paper/68">
            I don&apos;t have a finished project section yet, and I&apos;m not going to
            pretend I do. These are the areas I&apos;m building toward right now.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {focusAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-lg border border-ink/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="text-xl font-black">{area.title}</h3>
              <p className="mt-3 leading-7 text-ink/68 dark:text-paper/68">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="border-y border-ink/10 bg-white/55 py-20 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">Experience</h2>
            <p className="mt-4 text-lg leading-8 text-ink/68 dark:text-paper/68">
              My resume is a mix of operations, sales analysis, project support,
              and trading. The common thread is learning how decisions get made
              when time, people, and money are involved.
            </p>
          </div>
          <div className="mt-10 grid gap-6">
            {experiences.map((item) => (
              <article
                key={item.company}
                className="grid gap-4 border-l-2 border-emerald-600 pl-5 md:grid-cols-[0.8fr_1.2fr]"
              >
                <div>
                  <p className="font-black">{item.role}</p>
                  <p className="text-ink/60 dark:text-paper/60">{item.company}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {item.date}
                  </p>
                </div>
                <ul className="grid gap-2 text-ink/68 dark:text-paper/68">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Education</h2>
            <div className="mt-6 grid gap-6">
              {education.map((item) => (
                <article key={item.school}>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="text-xl font-black">{item.school}</h3>
                    <p className="font-semibold text-ink/60 dark:text-paper/60">
                      {item.dates}
                    </p>
                  </div>
                  <p className="mt-1 font-semibold text-ink/60 dark:text-paper/60">
                    {item.location}
                  </p>
                  <ul className="mt-3 grid gap-2 text-ink/68 dark:text-paper/68">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <h3 className="text-2xl font-black">Relevant Areas</h3>
            <p className="mt-3 leading-7 text-ink/68 dark:text-paper/68">
              The classes and interests that connect most closely to where I
              want to go professionally.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {coursework.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink/10 px-3 py-1 text-sm font-semibold dark:border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        className="border-y border-ink/10 bg-white/55 py-20 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight">Resume</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/68 dark:text-paper/68">
                This is the same resume I use for internships and professional
                opportunities. The website gives more context; the PDF keeps it
                straightforward.
              </p>
            </div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="rounded-lg bg-ink px-5 py-3 font-semibold text-paper dark:bg-paper dark:text-ink"
            >
              Download PDF
            </a>
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-ink/10 bg-white p-3 shadow-sm transition hover:translate-y-[-1px] dark:border-white/10"
          >
            <Image
              src="/resume-preview.png"
              alt="Preview of Armaan Mirpuri's resume"
              width={1275}
              height={1650}
              className="mx-auto h-auto w-full max-w-4xl rounded border border-ink/10"
            />
          </a>
          <p className="mt-3 text-sm font-semibold text-ink/60 dark:text-paper/60">
            Click the preview to open the full PDF.
          </p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Contact</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink/68 dark:text-paper/68">
              The easiest way to contact me is email. LinkedIn works too if
              you&apos;d rather connect there first.
            </p>
            <div className="mt-8 grid gap-3 text-lg font-semibold">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={linkedInUrl} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 border-t border-ink/10 pt-6 text-sm font-semibold text-ink/60 dark:border-white/10 dark:text-paper/60 md:flex-row">
          <p>Copyright {new Date().getFullYear()} Armaan Mirpuri.</p>
          <p>Built with Next.js, React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  );
}
