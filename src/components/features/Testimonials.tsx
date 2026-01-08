"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  image?: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

export function Testimonials({ testimonials, className = "bg-cream" }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={`${className} py-24 lg:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif tracking-tight text-forest sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray">
            Trusted by organizations committed to sustainability excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-100/50 hover:border-lime/40 transition-all duration-300 flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                {testimonial.image && (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-forest">{testimonial.name}</p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-gray-600">
                      {testimonial.role && testimonial.company
                        ? `${testimonial.role}, ${testimonial.company}`
                        : testimonial.role || testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

