"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "https://shift-yuw6.onrender.com/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Component() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ companyName: "", companyEmail: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = { companyName: "", companyEmail: "" };

    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required.";
    } else if (!validateEmail(companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    if (!newErrors.companyName && !newErrors.companyEmail) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(`waitlist`, {
          email: companyEmail,
          companyName,
        });
        console.log(response, "here is the response");
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={42} height={42} />
        </div>
      </header>

      <div className="absolute top-20 right-32 w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center">
        <Image
          src="/memoji1.png"
          alt="Logo"
          width={75}
          height={75}
          className="rounded-md w-25 h-25"
        />
      </div>

      <div className="absolute top-64 right-16 w-16 h-16 rounded-full flex items-center justify-center">
        <Image
          src="/memoji2.png"
          alt="Logo"
          width={55}
          height={55}
          className="rounded-md w-17 h-17"
        />
      </div>

      <div className="absolute bottom-60 md:left-1/2 left-1/7 w-16 h-16 rounded-full flex items-center justify-center">
        <Image
          src="/memoji5.png"
          alt="Logo"
          width={200}
          height={100}
          className="rounded-md"
        />
      </div>

      <div className="absolute bottom-32 right-24 w-16 h-16  md:flex hidden rounded-full items-center justify-center">
        <Image
          src="/memoji4.png"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-md"
        />
      </div>

      <div className="absolute bottom-16 right-8 w-16 h-16 rounded-full md:flex hidden bg-purple-200 items-center justify-center">
        <Image
          src="/memoji3.png"
          alt="Logo"
          width={104}
          height={104}
          className="rounded-md w-34 h-34"
        />
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <h1 className="text-4xl font-bold text-[#2A2A2A] leading-tight mb-8">
              Manage and assign shift to employees within your company.
            </h1>

            <div className="space-y-8">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-5 h-5 bg-[#6D19E2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2A2A2A] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#595959] leading-relaxed">
                      {feature.subTitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:pl-12"
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto min-h-[360px] flex flex-col items-center justify-center"
              variants={fadeVariants}
            >
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="text-green-500 w-10 h-10 mx-auto" />
                    <h2 className="text-2xl font-bold text-[#2A2A2A]">
                      You're now on our waitlist!
                    </h2>
                    <p className="text-gray-600">
                      Thanks for signing up. We'll let you know as soon as we
                      launch!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-3xl font-bold text-[#2A2A2A] mb-4 text-center">
                      Join our journey and get early access
                    </h2>
                    <p className="text-gray-600 text-center mb-8 leading-relaxed">
                      Something big is coming — built for companies like yours.
                      Join the waitlist for early access
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Your company name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className={`w-full px-4 py-7 border ${
                            errors.companyName
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-[#AEAEAE] focus:border-[#2A2A2A]`}
                        />
                        {errors.companyName && (
                          <motion.p
                            className="text-sm text-red-500 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.companyName}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Input
                          type="email"
                          placeholder="Enter your company email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          className={`w-full px-4 py-7 border ${
                            errors.companyEmail
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-[#AEAEAE] focus:border-[#2A2A2A]`}
                        />
                        {errors.companyEmail && (
                          <motion.p
                            className="text-sm text-red-500 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {errors.companyEmail}
                          </motion.p>
                        )}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleSubmit}
                          disabled={isLoading}
                          className="w-full bg-[#2A2A2A] hover:bg-gray-800 text-white py-7 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          {!isLoading ? (
                            <>
                              Join Waitlist
                              <ArrowRight className="w-4 h-4" />
                            </>
                          ) : (
                            " Submitting"
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Effortless Shift Scheduling. All in One Place",
    subTitle:
      "Upload shifts with ease, notify your entire team instantly, and keep everyone on the same page—no more confusion, missed shifts or manual updates.",
  },
  {
    title: "Swap, Give, and Take Shifts in Seconds",
    subTitle:
      "Empower your team with flexible shift control. Users can offer shifts to others or request swaps, all tracked and approved within the app no more messy group chats.",
  },
  {
    title: "Stay Updated with Real-Time Shift Alerts",
    subTitle:
      " From new schedules to last-minute changes, push notifications ensure every coworker sees updates the moment they happen—so your team always knows what's next.",
  },
];
