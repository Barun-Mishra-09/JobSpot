import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion, useAnimation } from "framer-motion";

import SliderImage from "./SidebarImageHeroSection";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  // animation control
  const controls = useAnimation();

  // Infinite scrolling logic
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
      controls.start({ transition: { duration: 0.5 } }); // slight ease out
    }
  }, [isHovered, controls]);
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/careerquest");
  };

  return (
    <motion.div
      className="relative overflow-hidden text-center py-8 px-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col gap-8 my-5 max-w-8xl mx-auto relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        {/* Tagline */}
        <motion.span
          className="mx-auto px-4 py-2 text-[#F83002] bg-white bg-opacity-90 rounded-full cursor-pointer shadow-md text-sm md:text-base font-medium"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
        >
          🚀 Where Ambition Meets Opportunity —
          <span className="text-[#5812d0]"> Discover Your Next Role.</span>
        </motion.span>

        {/* Heading */}
        <SliderImage />

        {/* Auto-Scrolling Feature Badges Section */}
        <motion.div
          className="relative overflow-hidden mx-auto mt-3 px-4 py-4 bg-gray-200 bg-opacity-90 rounded-2xl shadow-lg w-[95%] lg:w-[90%] xl:w-[100%] backdrop-blur"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={controls}
          >
            {[
              { icon: "💻", label: "Product Based Company" },
              { icon: "🤝", label: "Service Based Company" },
              { icon: "🌍", label: "Remote Job" },
              { icon: "🎓", label: "Internship" },
              { icon: "🚀", label: "Startup Jobs" },
              { icon: "🧠", label: "Fresher Opportunities" },
              // duplicate once to create seamless infinite loop
              { icon: "💻", label: "Product Based Company" },
              { icon: "🤝", label: "Service Based Company" },
              { icon: "🌍", label: "Remote Job" },
              { icon: "🎓", label: "Internship" },
              { icon: "🚀", label: "Startup Jobs" },
              { icon: "🧠", label: "Fresher Opportunities" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6D28D9] via-[#5812d0] to-[#2563EB] text-white px-6 py-3 rounded-full shadow-md text-sm sm:text-base font-medium cursor-pointer shrink-0"
              >
                {" "}
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="flex shadow-xl border border-gray-300 pl-3 rounded-full items-center gap-3 mx-auto w-[85%] sm:w-[65%] md:w-[50%] backdrop-blur-md bg-white bg-opacity-80 mt-5">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full pl-4 py-2.5 bg-transparent text-sm md:text-base placeholder:text-gray-500 max-w-[90%] sm:max-w-xl  lg:max-w-3xl"
          />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={searchJobHandler}
                  className="rounded-r-full bg-[#8A2BE2] hover:bg-[#5812d0] px-4 py-2 "
                >
                  <Search className="h-7 w-7 text-white" />
                </Button>
              </TooltipTrigger>
              {query.trim() !== "" && (
                <TooltipContent className="bg-[#5812d0] text-white px-3 py-2 rounded-lg shadow-md">
                  🎯 Your next big opportunity is just a search away!
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
