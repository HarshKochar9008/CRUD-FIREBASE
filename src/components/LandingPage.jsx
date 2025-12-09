import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundBeamsWithCollision from "./BackgroundBeamsWithCollision";
import TiltCard from "./TiltCard";

const LandingPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        if (buttonRef.current) {
            const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
            const center = { x: left + width / 2, y: top + height / 2 };
            const distance = { x: clientX - center.x, y: clientY - center.y };

            // Magnetic effect range
            if (Math.abs(distance.x) < 100 && Math.abs(distance.y) < 100) {
                setMousePosition({ x: distance.x * 0.2, y: distance.y * 0.2 });
            } else {
                setMousePosition({ x: 0, y: 0 });
            }
        }
    };

    return (
        <div
            className="relative h-screen w-full overflow-hidden bg-gray-900 text-white flex flex-col items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl z-0"
            />
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl z-0"
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
                <TiltCard className="p-8 rounded-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-4">
                            Manage Connections <br /> Like a Pro.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="mt-6 text-lg md:text-2xl text-white/70 max-w-2xl mx-auto"
                    >
                        A minimal, glassmorphic contact manager designed for the modern web.
                        Fast, secure, and beautiful.
                    </motion.p>
                </TiltCard>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-10"
                >
                    <Link to="/app">
                        <motion.button
                            ref={buttonRef}
                            animate={{ x: mousePosition.x, y: mousePosition.y }}
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all overflow-hidden"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
