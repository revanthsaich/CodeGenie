import { motion } from "framer-motion";

const steps = [
  { number: 1, title: "Describe Your Need", desc: "Tell CodeGenie what you want to build" },
  { number: 2, title: "AI Processing", desc: "Our AI analyzes your requirements" },
  { number: 3, title: "Code Generation", desc: "Get production-ready code instantly" }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works px-4 py-16 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="relative p-6 bg-base-200 rounded-lg shadow-lg"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;