
import { useEffect, useRef } from "react"

import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "../components/ui/text-rotate"
import Floating, { FloatingElement } from "../components/ui/parallax-floating"
import { Link } from "@tanstack/react-router"
import { AnimatedTestimonials } from "../components/ui/animated-testimonials"
const exampleImages = [
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm1.jpg",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url:"https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm2.jpg",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm9.jpg",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm4.jpg",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm5.jpg",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm6.jpeg",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm7.jpg",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://awsoenusvdigsohsnkuw.supabase.co/storage/v1/object/public/painjobs//sm10.jpeg",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function LandingHero() {
  return (
    <>
    <section className="w-screen max-h-screen h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
<Floating sensitivity={-0.5} className="h-[88vh] w-[98%] m-4">
  <FloatingElement depth={0.5} className="top-[20%] left-[5%] md:top-[25%] md:left-[7%]">
    <motion.img
      src={exampleImages[0].url}
      alt={exampleImages[0].title}
      className="w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-16 lg:w-24 lg:h-20 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  </FloatingElement>

  <FloatingElement depth={1} className="top-[5%] left-[10%] md:top-[8%] md:left-[14%]">
    <motion.img
      src={exampleImages[7].url}
      alt={exampleImages[7].title}
      className="w-32 h-24 sm:w-36 sm:h-28 md:w-44 md:h-32 lg:w-48 lg:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    />
  </FloatingElement>

  <FloatingElement depth={4} className="top-[85%] left-[10%] md:top-[75%] md:left-[12%]">
    <motion.img
      src={exampleImages[1].url}
      alt={exampleImages[1].title}
      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    />
  </FloatingElement>

  <FloatingElement depth={2} className="top-[3%] left-[85%] md:top-[5%] md:left-[82%]">
    <motion.img
      src={exampleImages[2].url}
      alt={exampleImages[2].title}
      className="w-36 h-32 sm:w-40 sm:h-36 md:w-48 md:h-44 lg:w-52 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
    />
  </FloatingElement>

  <FloatingElement depth={1} className="top-[72%] left-[78%] md:top-[65%] md:left-[80%]">
    <motion.img
      src={exampleImages[3].url}
      alt={exampleImages[3].title}
      className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[15deg] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
    />
  </FloatingElement>

  {/* Additional Images (Moved Away from Center) */}
  <FloatingElement depth={2} className="top-[45%] left-[70%] md:top-[45%] md:left-[70%]">
    <motion.img
      src={exampleImages[4].url}
      alt={exampleImages[4].title}
      className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl -rotate-[10deg] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    />
  </FloatingElement>

  <FloatingElement depth={3} className="top-[40%] left-[30%] md:top-[42%] md:left-[22%]">
    <motion.img
      src={exampleImages[5].url}
      alt={exampleImages[5].title}
      className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[8deg] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.7 }}
    />
  </FloatingElement>
  <FloatingElement depth={3} className="top-[8%] left-[28%] md:top-[10%] md:left-[30%]">
    <motion.img
      src={exampleImages[6].url}
      alt={exampleImages[6].title}
      className="w-22 h-26 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[8deg] rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.7 }}
    />
  </FloatingElement>
</Floating>
      <div className="flex flex-col justify-center items-center w-[350px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-6xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Make your </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Figurine{" "}
              </motion.span>
              <TextRotate
                texts={[
                  "suspicious🧐",
                  "mutated🧚‍♂️",
                  "heretical😈",
                  "loyal👑",
                  "augmented🤖",
                  "wild💃🕺",
                  "smelly🤢",
                  "🕶️ smarta**",
                  "go 🚀",
                  "🔥🔥🔥",
                  "secretive🤫",
                  "heroic⚔️",
                  "colorful🤘",
                ]}
                mainClassName="overflow-hidden pr-3 text-[#1f598f] py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Make your OWN! COOL! Chapter. Make the emperor Proud, or please the Chaos gods. The choice is yours!
        </motion.p>

        <div className="flex flex-row justify-center space-x-2 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
          <motion.button
            className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-background bg-primary px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link to="/app">
              Editor
            </Link>
          </motion.button>
          <motion.button
            className="sm:text-base md:text-xs lg:text-xl font-semibold tracking-tight text-white bg-secondary px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link to="/about">About</Link>
          </motion.button>
        </div>
      </div>
        
    </section>
    <section className="w-screen max-h-screen h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
<AnimatedTestimonials testimonials={testimonials} />
    </section>
    <section className="w-screen h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
      
    </section>
    </>
  )
}

export default LandingHero 
