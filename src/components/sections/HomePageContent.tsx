"use client";

import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { COMPANY_INFO } from "@/lib/constants";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { Testimonials } from "@/components/features/Testimonials";
import { QuickContactForm } from "@/components/features/QuickContactForm";
import { Hero } from "@/components/sections/Hero";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface HomePageContentProps {
  services: Array<{ slug: string; name: string; description: string }>;
  testimonials: Array<{
    id: string;
    name: string;
    company?: string;
    role?: string;
    content: string;
    image?: string;
    rating: number;
  }>;
}

export function HomePageContent({ services, testimonials }: HomePageContentProps) {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section - Full width with vector graphics */}
        <Hero />

        {/* Services Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section Header with Illustration */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:max-w-xl text-center lg:text-left"
              >
                <h2 className="text-3xl font-serif tracking-tight text-forest sm:text-4xl lg:text-5xl">Our Expertise</h2>
                <p className="mt-4 text-lg leading-8 text-gray">
                  Technical advisory and management support to meet compliance targets and drive operational efficiency.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <Image
                  src="/sustainability-illustration.png"
                  alt="Sustainability illustration"
                  width={320}
                  height={320}
                  className="w-56 h-56 lg:w-72 lg:h-72 object-contain mix-blend-multiply"
                />
              </motion.div>
            </div>

            {/* Row 1: 4 cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6"
            >
              {services.slice(0, 4).map((service) => (
                <motion.div key={service.slug} variants={itemVariants} className="h-full">
                  <ServiceCard
                    slug={service.slug}
                    title={service.name}
                    description={service.description}
                    compact={true}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2: Remaining cards centered */}
            {services.length > 4 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-wrap justify-center gap-6"
              >
                {services.slice(4).map((service) => (
                  <motion.div key={service.slug} variants={itemVariants} className="w-full sm:w-[48%] lg:w-[23%]">
                    <ServiceCard
                      slug={service.slug}
                      title={service.name}
                      description={service.description}
                      compact={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <ProcessSteps />

        {/* Who We Serve Section - White Background */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <TargetAudience />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full"
            >
              <ValueProposition />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - Cream Background */}
        <Testimonials
          testimonials={testimonials.length > 0 ? testimonials : [
            {
              id: "mock-1",
              name: "Sarah Johnson",
              company: "TechForward Solutions",
              role: "COO",
              content: "CGC helped us navigate the complex landscape of ESG reporting. Their strategic insights were instrumental in our successful TCFD disclosure.",
              rating: 5,
            },
            {
              id: "mock-2",
              name: "Ahmed Al-Mansoori",
              company: "Gulf Infrastructure",
              role: "Project Director",
              content: "The energy audit conducted by the Clean Globe team identified savings we hadn't even considered. Highly professional and results-driven.",
              rating: 5,
            },
            {
              id: "mock-3",
              name: "Emily Chen",
              company: "Global Retail Inc.",
              role: "Sustainability Manager",
              content: "Achieving our net-zero targets seemed impossible until we partnered with CGC. Their roadmap was practical, scientifically sound, and easy to implement.",
              rating: 5,
            }
          ]}
          className="bg-cream"
        />

        {/* Quick Contact Form Section - Olive Background */}
        <section className="bg-olive py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-serif tracking-tight text-lime sm:text-4xl mb-4">
                  Have a Question?
                </h2>
                <p className="text-lg leading-8 text-cream/90 mb-6">
                  Get in touch with our team. We're here to help you achieve your sustainability goals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20 text-lime flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email Us</p>
                      <p className="text-cream/80">operations@thecleanglobe.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20 text-lime flex-shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Call Us</p>
                      <p className="text-cream/80">{COMPANY_INFO.phone.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20 text-lime flex-shrink-0">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">WhatsApp</p>
                      {COMPANY_INFO.phone.map((phone) => (
                        <a
                          key={phone}
                          href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cream/80 hover:text-lime transition-colors block mb-1"
                        >
                          {phone}
                        </a>
                      ))}
                      <span className="text-xs text-lime/80 mt-1 block">Click to chat</span>
                    </div>
                  </div>
                </div>
              </div>
              <QuickContactForm />
            </div>
          </div>
        </section>


      </div>

      <CTASection />
    </>
  );
}

