import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

import JobIcon from "./shared/JobIcon.jpg";

const Footer = () => {
  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      rotate: [0, -10, 10, 0], // Wiggle effect
      transition: { duration: 0.6 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-4"
    >
      <motion.footer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gradient-to-r from-[#e0e7fff0] to-[#e0e0ff] backdrop-blur-sm text-blue-700 py-10 rounded-2xl w-full mx-auto shadow-lg  border border-violet-500"
      >
        <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-6 gap-8">
          {/* Left Section - JobSpot */}
          <div className="flex items-center gap-2">
            <motion.img
              src={JobIcon}
              alt="icon"
              height={40}
              width={40}
              className="rounded-full"
              animate={{
                y: [0, -6, 0, 0],
                rotate: [0, 3, -5, 0], // small tilt like Foundit
                scale: [1, 1.2, 1, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.18, 0.28, 1],
              }}
            />

            <h1 className="text-2xl font-bold cursor-pointer md:text-4xl text-black">
              Job<span className="text-[#F83002]">Spot</span>
            </h1>
          </div>

          {/* Center Section - Quick Links */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-8 text-center md:text-left"
          >
            <motion.h4
              variants={itemVariants}
              className="text-lg font-semibold mb-3 col-span-2 text-[#F83002] text-center"
            >
              Quick Links
            </motion.h4>

            <motion.div variants={itemVariants}>
              <ul className="space-y-3 text-lg">
                <li>
                  <motion.a
                    whileHover={{
                      x: 5,
                      color: "#F83002",
                      textShadow: "0 2px 5px rgba(248, 48, 2, 0.2)",
                    }}
                    href="/about-us"
                    className="block transition-all duration-300 hover:underline underline-offset-4"
                  >
                    About Us
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    whileHover={{
                      x: 5,
                      color: "#F83002",
                      textShadow: "0 2px 5px rgba(248, 48, 2, 0.2)",
                    }}
                    href="/privacy-policy"
                    className="block transition-all duration-300 hover:underline underline-offset-4"
                  >
                    Privacy Policy
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ul className="space-y-3 text-lg">
                <li>
                  <motion.a
                    whileHover={{
                      x: 5,
                      color: "#F83002",
                      textShadow: "0 2px 5px rgba(248, 48, 2, 0.2)",
                    }}
                    href="/terms-conditions"
                    className="block transition-all duration-300 hover:underline underline-offset-4"
                  >
                    Terms & Conditions
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    whileHover={{
                      x: 5,
                      color: "#F83002",
                      textShadow: "0 2px 5px rgba(248, 48, 2, 0.2)",
                    }}
                    href="/contact-us"
                    className="block transition-all duration-300 hover:underline underline-offset-4"
                  >
                    Contact Us
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Section - Follow Me (Background unchanged) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <motion.h4
              whileHover={{ scale: 1.05 }}
              className="text-lg font-semibold mb-3"
            >
              Follow Us
            </motion.h4>

            <motion.div variants={containerVariants} className="flex space-x-4">
              {/* LinkedIn - Dark Blue */}
              <motion.a
                target="blank"
                href="https://www.linkedin.com/in/barun-kumar-mishra-bba651368/"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors"
              >
                <FaLinkedinIn size={20} />
              </motion.a>

              {/* Facebook - Light Blue */}
              <motion.a
                target="blank"
                href="https://facebook.com"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </motion.a>

              {/* Twitter - Black */}
              <motion.a
                target="blank"
                href="https://x.com"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-white transition-colors"
              >
                <FaXTwitter size={20} />
              </motion.a>

              {/* Instagram - Pink */}
              <motion.a
                target="blank"
                href="https://www.instagram.com/_barun_mishra_/"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#E4405F] text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated divider */}
      </motion.footer>
    </motion.div>
  );
};

export default Footer;
