import React from "react";
import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";
import SectionTitle from "@/app/Components/ui/SectionTitle";
const testimonials = [
  {
    id: 1,
    quote:
      "3gConsultants provided exceptional engineering expertise for our infrastructure project. Their innovative solutions and attention to detail exceeded our expectations.",
    author: "Michael Chang",
    position: "Director of Infrastructure, Metro Development",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 2,
    quote:
      "Working with 3gConsultants on our environmental impact assessment was a seamless experience. Their expertise in sustainable engineering is unmatched.",
    author: "Dr. Sarah Martinez",
    position: "Environmental Director, GreenTech Solutions",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&format=jpg&w=774&q=80",
  },
  {
    id: 3,
    quote:
      "The team at 3gConsultants demonstrated exceptional skill in managing our complex urban development project. Their commitment to innovation and sustainability is remarkable.",
    author: "James Wilson",
    position: "CEO, Urban Development Corp",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&format=jpg&w=774&q=80",
  },
];
const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -5,
      }}
      className="relative bg-white p-8 rounded-2xl shadow-xl"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl opacity-0"
        whileHover={{
          opacity: 0.05,
          transition: {
            duration: 0.3,
          },
        }}
      />
      <div className="flex flex-col h-full">
        <QuoteIcon size={40} className="text-yellow-500 opacity-50 mb-6" />
        <p className="text-black mb-8 flex-grow text-lg leading-relaxed">
          "{testimonial.quote}"
        </p>
        <div className="flex items-center">
          <motion.img
            whileHover={{
              scale: 1.1,
            }}
            src={testimonial.image}
            alt={testimonial.author}
            className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
          />
          <div className="ml-4">
            <motion.h4
              initial={{
                opacity: 0.8,
              }}
              whileHover={{
                opacity: 1,
              }}
              className="font-bold text-black text-lg"
            >
              {testimonial.author}
            </motion.h4>
            <motion.p
              initial={{
                opacity: 0.6,
              }}
              whileHover={{
                opacity: 0.8,
              }}
              className="text-gray-500 text-sm"
            >
              {testimonial.position}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#f5f5f5] relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center mb-16"
        >
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Discover why leading organizations trust BuildConstruct for their engineering needs"
            centered={true}
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;
