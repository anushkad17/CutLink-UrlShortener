import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "./Card"; // Make sure this file exists

const LandingPage = () => {
  const navigate = useNavigate();

  const dashBoardNavigateHandler = () => {
    navigate("/dashboard"); // Update this path to your actual route
  };

  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row lg:py-5 pt-16 lg:gap-10 gap-8 justify-between items-center">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold text-slate-800 md:text-5xl sm:text-4xl text-3xl md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full"
          >
            CutLink Simplifies URL Shortening For Efficient Sharing.
          </motion.h1>
          <p className="text-slate-700 text-sm my-5">
            CutLink streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            CutLink allows you to generate concise, easy-to-share URLs in
            seconds. Simplify your sharing experience with CutLink today.
          </p>
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="bg-blue-600 hover:bg-blue-700 w-40 text-white rounded-md py-2"
            >
              Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="border-blue-600 border w-40 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md py-2"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>

        <div className="flex-1 flex justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:w-[480px] w-[400px] object-cover rounded-md"
            src="/images/logo.png"
            alt="Hero"
          />
        </div>
      </div>

      {/* Trusted Section */}
      <div className="sm:pt-12 pt-7">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-slate-800 font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Trusted by individuals and teams at the world’s best companies
        </motion.p>

        <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="Simple URL Shortening"
            desc="Create short, memorable URLs in just a few clicks. Our intuitive interface ensures quick setup and hassle-free shortening."
          />
          <Card
            title="Powerful Analytics"
            desc="Gain insights into your link performance. Track clicks, geographic data, and referral sources easily."
          />
          <Card
            title="Enhanced Security"
            desc="Shortened URLs are protected with advanced encryption to ensure data safety."
          />
          <Card
            title="Fast and Reliable"
            desc="Experience lightning-fast redirects and high availability with our robust infrastructure."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
