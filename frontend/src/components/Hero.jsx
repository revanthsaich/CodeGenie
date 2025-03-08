import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero h-[75vh] flex items-center justify-center bg-base-200 text-base-content">
      {/* Container for Centered Content */}
      <div className="text-center max-w-3xl">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
        >
          Welcome to CodeGenie AI
        </motion.h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-medium mb-8">
          Transform your ideas into production-ready code with the power of artificial intelligence.
        </p>

        {/* Call-to-Action Button */}
        <Link to="/chat">
          <button className="btn btn-primary btn-lg">
            Start Coding Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;