// "use client";
// import { motion } from "motion/react";
// import React from "react";
// import { ImagesSlider } from "../ui/images-slider";
// import { Typography, Button } from "@mui/material";

// export function ImagesSliderDemo() {
//   const images = [
//     "https://images.unsplash.com/photo-1464983308776-3c7215084895?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1740635341299-3b8e3490f546?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   ];

//   return (
//     <ImagesSlider style={{ width: "100vw" }} images={images}>
//       {/* Dark overlay for better text visibility */}
//       <div className="absolute inset-0 bg-black/40 z-40" />

//       {/* Centered Content */}
//       <motion.div
//         initial={{ opacity: 0, y: -80 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         style={{
//             position: "absolute",
//             inset: 0, // fill the parent
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             color: "white",
//             zIndex: 50,
//             padding: "0 1rem",
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             fontWeight: "bold",
//             textShadow: "0px 2px 10px rgba(0,0,0,0.7)",
//           }}
//         >
//           Welcome to <span style={{ color: "#34d399" }}>Zenith</span>
//         </Typography>

//         <Typography
//           variant="h6"
//           sx={{
//             mt: 2,
//             mb: 4,
//             textShadow: "0px 2px 10px rgba(0,0,0,0.6)",
//           }}
//         >
//           Where Innovation Meets Excellence
//         </Typography>

//         <Button
//           variant="contained"
//           size="large"
//           sx={{
//             borderRadius: "50px",
//             background: "linear-gradient(90deg,#34d399,#10b981)",
//             px: 4,
//             py: 1.5,
//             "&:hover": {
//               background: "linear-gradient(90deg,#10b981,#34d399)",
//             },
//           }}
//         >
//           Get Started
//         </Button>
//       </motion.div>
//     </ImagesSlider>
//   );
// }

"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1464983308776-3c7215084895?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1740635341299-3b8e3490f546?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center">
        <motion.p
          className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
