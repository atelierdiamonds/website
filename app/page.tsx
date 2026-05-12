'use client'

import Image from 'next/image'
import { useState, FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  desired: string
  message: string
}

const inputClass =
  'w-full bg-transparent border-b border-white/20 text-white font-jost text-sm py-4 placeholder:text-white/20 focus:outline-none focus:border-atelier-gold transition-colors duration-300'

const labelClass =
  'block text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3 font-jost'

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    desired: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-atelier-black px-6 md:px-16 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Atelier Diamonds"
            width={1634}
            height={750}
            style={{ width: 'clamp(80px, 10vw, 140px)', height: 'auto', display: 'block' }}
          />
          <span className="text-white text-[11px] tracking-[0.35em] uppercase font-jost font-light whitespace-nowrap">
            Atelier Diamonds
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {[
            ['About', '#about'],
            ['Philosophy', '#philosophy'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-white/50 hover:text-white text-[11px] tracking-[0.25em] uppercase font-jost font-light transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="text-white text-[11px] tracking-[0.25em] uppercase font-jost font-light border-b border-white/30 hover:border-atelier-gold hover:text-atelier-gold pb-0.5 transition-all duration-300 whitespace-nowrap"
        >
          <span className="md:hidden">Contact Us</span>
          <span className="hidden md:inline">Request a Consultation</span>
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen bg-atelier-black overflow-hidden flex items-end">
        <Image src="/laishaandchloe2.jpg" alt="Atelier Diamonds" fill className="object-cover object-center opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-atelier-black via-atelier-black/30 to-transparent" />

        <div className="relative z-10 px-10 md:px-20 pb-20 md:pb-28">
          <h1 className="font-cormorant font-light text-white leading-[0.9] tracking-tight">
            <span className="block text-[clamp(4rem,9vw,9rem)]">Where</span>
            <span className="block text-[clamp(4rem,9vw,9rem)]">imagination</span>
            <span className="block text-[clamp(4rem,9vw,9rem)] italic">takes form</span>
          </h1>
        </div>
      </section>

      {/* ── TAGLINE / INTRO ── */}
      <section className="bg-white px-8 py-28 md:py-44 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <p className="font-cormorant italic text-atelier-black text-2xl md:text-[2.2rem] leading-relaxed tracking-wide mb-16">
            Bespoke diamonds. Curated rarity. Designed to endure.
          </p>
          <div className="w-10 h-px bg-atelier-gold mx-auto mb-16" />
          <p className="font-jost text-neutral-500 text-base md:text-lg leading-loose tracking-wide max-w-xl mx-auto">
            Every diamond begins as an idea — a vision shaped by light, proportion, and emotion.
            Atelier Diamonds creates one-of-a-kind diamond pieces through custom cutting, curated
            sourcing, and artisanal craftsmanship.
          </p>
        </div>
      </section>

      {/* ── BRAND ESSENCE ── */}
      <section className="bg-atelier-warm px-8 md:px-20 py-28 md:py-44">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center">
          <div>
            <p className="text-atelier-gold text-sm tracking-[0.4em] uppercase font-jost mb-10">
              Brand Essence
            </p>
            <h2 className="font-cormorant font-light text-atelier-black text-4xl md:text-[3.5rem] leading-tight mb-12">
              Where imagination
              <br />
              <em>meets precision.</em>
            </h2>
            <div className="w-8 h-px bg-atelier-gold mb-12" />
            <div className="space-y-6 font-jost text-neutral-500 text-base md:text-[17px] leading-loose">
              <p>
                Atelier Diamonds is not built around inventory. It is built around possibility.
              </p>
              <p>
                Each piece begins with a conversation: a desired shape, a rare stone, a feeling, a
                silhouette, a proportion. From there, we source, design, cut, re-cut, and create
                with a singular purpose — to realize a jewel that could not exist anywhere else.
              </p>
              <p className="italic text-neutral-400">
                Our work is architectural yet romantic. Technical yet emotional. Every facet is
                considered. Every detail has intent.
              </p>
            </div>
          </div>

          <div className="order-first lg:order-last flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[706/1239]">
              <Image src="/diamond.png" alt="Atelier Diamond" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="philosophy" className="bg-atelier-black px-8 md:px-20 py-28 md:py-44">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-atelier-gold text-sm tracking-[0.4em] uppercase font-jost mb-12">
            Our Philosophy
          </p>
          <h2 className="font-cormorant font-light text-white text-4xl md:text-6xl leading-tight mb-16">
            The Pursuit
            <br />
            <em>of Beauty</em>
          </h2>
          <div className="w-8 h-px bg-atelier-gold mx-auto mb-16" />
          <div className="font-cormorant italic text-white/70 text-xl md:text-[1.7rem] leading-relaxed space-y-3 mb-16">
            <p>We believe the finest jewelry is never mass produced.</p>
            <p>It is imagined slowly.</p>
            <p>Sourced meticulously.</p>
            <p>Crafted deliberately.</p>
          </div>
          <p className="font-jost text-white/50 text-[14px] md:text-base leading-loose max-w-2xl mx-auto">
            Atelier was founded around a simple idea: that truly exceptional jewelry should feel
            personal, architectural, and emotionally significant. Our work combines old-world
            craftsmanship with modern refinement, focusing on extraordinary stones, elegant
            proportions, and uncompromising finishing.
          </p>
        </div>
      </section>

      {/* ── BRAND PILLARS ── */}
      <section className="bg-white px-8 md:px-20 py-28 md:py-44">
        <div className="max-w-7xl mx-auto">
          <p className="text-atelier-gold text-sm tracking-[0.4em] uppercase font-jost mb-20 text-center">
            The Four Pillars
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
            {[
              {
                n: 'I',
                title: 'Curation',
                text: 'Every gem is hand-selected for beauty, rarity, proportion, and potential. When required, stones may be re-cut or refined to meet Atelier standards.',
              },
              {
                n: 'II',
                title: 'Creation',
                text: 'Each design is original, considered, and deeply personal — shaped around the stone, the wearer, and the story it is meant to carry.',
              },
              {
                n: 'III',
                title: 'Craftsmanship',
                text: 'Our work emphasizes fine finishing, precision setting, French pavé, hidden halos, architectural mounts, and old-world hand craftsmanship.',
              },
              {
                n: 'IV',
                title: 'Continuity',
                text: 'Atelier pieces are designed to live beyond the moment — heirlooms to be worn, remembered, and passed forward.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="border-t border-atelier-black/15 pt-8">
                <p className="font-cormorant italic text-atelier-gold text-lg mb-2">{pillar.n}</p>
                <h3 className="font-cormorant text-atelier-black text-2xl md:text-3xl mb-6">
                  {pillar.title}
                </h3>
                <p className="font-jost text-neutral-500 text-sm md:text-[15px] leading-loose">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / BIO ── */}
      <section id="about" className="bg-atelier-warm px-8 md:px-20 py-28 md:py-44">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center">
          <div>
            <p className="text-atelier-gold text-sm tracking-[0.4em] uppercase font-jost mb-10">
              About Atelier Diamonds
            </p>
            <h2 className="font-cormorant font-light text-atelier-black text-4xl md:text-[3rem] leading-tight mb-12">
              Laisha Bragg
            </h2>
            <div className="w-8 h-px bg-atelier-gold mb-12" />
            <div className="space-y-6 font-jost text-neutral-500 text-base md:text-[17px] leading-loose">
              <p>
                Atelier Diamonds was founded by Laisha Bragg after more than fifteen years working
                within the world of high fashion. She developed a deep appreciation for exceptional
                craftsmanship, refined design, and the emotional significance of extraordinary
                jewellery.
              </p>
              <p>
                In 2020, Laisha began privately sourcing bespoke diamonds and creating custom pieces
                for a close circle of fashion clients and personal referrals. What started as a
                highly personal service quickly grew, driven by a reputation for rare stones,
                meticulous attention to detail, and a genuinely bespoke approach.
              </p>
              <p>
                Atelier Diamonds now offers that same elevated experience to a wider audience of
                clients. Atelier was never created to be a traditional jewellery retailer. It was
                built around the belief that truly exceptional jewellery should feel personal,
                intentional, and impossible to replicate.
              </p>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="/laisha.jpg" alt="Laisha Bragg" fill className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-atelier-black px-8 md:px-20 py-28 md:py-44">
        <div className="max-w-xl mx-auto">
          <p className="text-atelier-gold text-sm tracking-[0.4em] uppercase font-jost mb-8 text-center">
            Private Consultations
          </p>
          <h2 className="font-cormorant font-light text-white text-4xl md:text-6xl text-center leading-tight mb-4">
            Begin the
            <br />
            <em>conversation</em>
          </h2>
          <p className="font-jost text-white/40 text-[12px] tracking-[0.25em] uppercase text-center mb-16">
            Request a Private Consultation
          </p>
          <div className="w-8 h-px bg-atelier-gold mx-auto mb-16" />

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="+1 (000) 000-0000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Desired Piece / Stone / Occasion</label>
              <input
                type="text"
                value={form.desired}
                onChange={update('desired')}
                placeholder="Describe your vision…"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="Share any additional details…"
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full border border-atelier-gold text-atelier-gold font-jost text-[11px] tracking-[0.4em] uppercase py-5 hover:bg-atelier-gold hover:text-atelier-black transition-all duration-500 disabled:opacity-50"
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'sent'
                  ? 'Request Received'
                  : 'Request a Consultation'}
              </button>
            </div>

            {status === 'sent' && (
              <p className="font-cormorant italic text-atelier-gold text-lg text-center">
                Thank you. We will be in touch shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="font-jost text-red-400 text-[12px] tracking-wide text-center">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-atelier-black border-t border-white/5 px-8 md:px-20 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Atelier Diamonds"
              width={1634}
              height={750}
              style={{ width: '80px', height: 'auto', display: 'block', opacity: 0.5 }}
            />
            <span className="text-white/40 text-[11px] tracking-[0.35em] uppercase font-jost">
              Atelier Diamonds
            </span>
          </div>
          <p className="text-white/20 text-[11px] font-jost tracking-wider">
            © {new Date().getFullYear()} Atelier Diamonds. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
