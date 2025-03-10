import { FiCode, FiCpu, FiGlobe, FiAperture } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  { icon: <FiCode />, title: "Code Generation", desc: "Generate code in multiple languages" },
  { icon: <FiCpu />, title: "AI Assistance", desc: "Intelligent code suggestions" },
  { icon: <FiGlobe />, title: "Language Support", desc: "Support for major programming languages" },
  { icon: <FiAperture />, title: "Smart Suggestions", desc: "Context-aware code completion" }
];

const Features = () => {
  return (
    <section className="features px-4 py-16 bg-base-100 mb-9 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Feature cards */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.6 }}
              className="p-6 bg-base-100 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-95 hover:bg-base-200"
            >
              <div className="text-3xl text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base">{feature.desc}</p>
            </motion.div>
          ))}

          
        </div>
      </div>
    </section>
  );
};

export default Features;
