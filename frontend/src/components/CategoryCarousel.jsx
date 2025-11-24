import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion } from "framer-motion";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Mern Stack Developer",
  "Full Stack Developer",
  "Data Science",
  "Cloud Engineer",
  "Ethical Hacker",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/careerquest");
  };

  return (
    <motion.div
      className="relative overflow-hidden text-center py-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="transform scale-[0.85] origin-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        <Carousel
          className="w-full max-w-[90%] sm:max-w-6xl mx-auto my-6 relative"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent className="ml-0">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-[100%] sm:basis-[48%] md:basis-[32.33%] lg:basis-[25%] "
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    variant="outline"
                    className={`py-2 w-[80%] text-xs sm:text-sm 
  ${
    [
      "Frontend Developer",
      "Backend Developer",
      "Mern Stack Developer",
      "Full Stack Developer",
      "Data Science",
      "Cloud Engineer",
      "Ethical Hacker",
    ].includes(cat)
      ? "lg:text-sm xl:text-base"
      : "md:text-base lg:text-lg"
  }
  rounded-full text-[#8A2BE2] bg-white border-[#8A2BE2] 
  hover:border-[#059669] hover:text-[#059669] 
  focus:text-[#F83002] hover:bg-green-50 `}
                  >
                    {cat}
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 left-[11px] sm:left-[35px] md:left-[30px] lg:left-[35px] xl:left-[18px] z-50"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <CarouselPrevious
                    className="size-8 sm:size-8 md:size-9 lg:size-10 xl:size-12 
                              text-[#8A2BE2] hover:text-[#059669]
                              bg-white rounded-full shadow-md border border-[#8A2BE2] 
                              hover:border-[#059669] hover:bg-green-100"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-gray-800 text-white px-2 py-1 sm:px-3 sm:py-2 
                         rounded-lg shadow-md text-xs sm:text-sm"
              >
                🔙 Go Back & Explore More
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 right-[11px] sm:right-[35px] md:right-[30px] lg:right-[22px] xl:right-[-19px] z-50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <CarouselNext
                    className="size-8 sm:size-8 md:size-9 lg:size-10 xl:size-12 
                              text-[#8A2BE2] hover:text-[#059669]
                              bg-white/80 rounded-full shadow-md border border-[#8A2BE2] 
                              hover:border-[#059669] hover:bg-green-100"
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-gray-800 text-white px-2 py-1 sm:px-3 sm:py-2 
                         rounded-lg shadow-md text-xs sm:text-sm"
              >
                Move Forward & Unlock More ➡️
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Carousel>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCarousel;
