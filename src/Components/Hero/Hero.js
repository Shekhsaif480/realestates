import CountUp from "react-countup";
import { motion } from "framer-motion";
import heroimg from "../../imgs/download.jpeg";

const Hero = () => {
  return (
    <section className="hero-wrapper bg-transparent text-white">
      <div className="paddings innerWidth flex items-end justify-around">
        {/* Left side */}
        <div className="flex flex-col items-start gap-8">
          <div className="relative">
            <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full z-0"></div>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
              className="font-bold text-4xl md:text-6xl"
            >
              Discover <br />
              Most Suitable <br />
              Property
            </motion.h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-sm md:text-base">Find a variety of properties that suit you very easily</span>
            <span className="text-sm md:text-base">Forget all difficulties in finding a residence for you</span>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl">
                <CountUp start={8800} end={9000} duration={4} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-sm md:text-base">Premium Product</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl">
                <CountUp start={1950} end={2000} duration={4} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-sm md:text-base">Happy Customer</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl">
                <CountUp end={28} /> <span className="text-orange-500">+</span>
              </span>
              <span className="text-sm md:text-base">Awards Winning</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center md:mt-20">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="w-80 md:w-96 h-96 overflow-hidden rounded-full border-8 border-white"
          >
            <img src={heroimg} alt="houses" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
