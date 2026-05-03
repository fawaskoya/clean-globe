"use client";

import { CTASection } from "@/components/sections/CTASection";
import { SparklesIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string | null;
}

interface AdvisoryBoardContentProps {
  members: BoardMember[];
}

export function AdvisoryBoardContent({ members }: AdvisoryBoardContentProps) {
  return (
    <>
      {/* Header */}
      <div className="relative isolate overflow-hidden bg-olive pt-4 pb-10 sm:pt-6 sm:pb-14">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-forest/10 blur-3xl"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="mx-auto max-w-2xl text-center lg:text-left lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <SparklesIcon className="h-5 w-5 text-lime" />
              <span className="text-sm font-medium text-lime">Leadership</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-lime font-serif sm:text-6xl"
            >
              Advisory Board
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-cream/80"
            >
              Distinguished experts guiding our strategic direction and ensuring technical excellence.
            </motion.p>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full max-w-md text-lime opacity-80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              >
                <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="20" r="4" fill="currentColor" />
                <circle cx="170" cy="60" r="4" fill="currentColor" />
                <circle cx="170" cy="140" r="4" fill="currentColor" />
                <circle cx="100" cy="180" r="4" fill="currentColor" />
                <circle cx="30" cy="140" r="4" fill="currentColor" />
                <circle cx="30" cy="60" r="4" fill="currentColor" />
                <line x1="100" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.2" />
                <line x1="100" y1="100" x2="170" y2="140" stroke="currentColor" strokeWidth="0.2" />
                <line x1="100" y1="100" x2="30" y2="140" stroke="currentColor" strokeWidth="0.2" />
              </motion.g>
              <circle cx="100" cy="100" r="6" fill="currentColor" className="text-white" />
            </motion.svg>
          </div>
        </div>
      </div>

      {/* Board Grid */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {members.length === 0 ? (
            <p className="text-center text-gray-500">Advisory board information coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-3xl p-8 pt-12 shadow-sm border border-gray-100/50 hover:border-lime/40 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-cream border-4 border-white shadow-md flex items-center justify-center overflow-hidden group-hover:border-lime transition-colors duration-300">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    ) : (
                      <UserCircleIcon className="w-12 h-12 text-forest/20" />
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-forest font-serif">{member.name}</h3>
                    <p className="text-lime font-medium text-sm mt-1 mb-4">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">&ldquo;{member.bio}&rdquo;</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CTASection title="Join Our Network" description="We are always looking for experts to collaborate with on special projects." primaryBtnText="Contact Us" />
    </>
  );
}
