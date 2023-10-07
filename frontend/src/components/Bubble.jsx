import { Box } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

const Bubble = () => {
  return (
    <Box overflow={"hidden"}>
      <Box position="relative" width="100vw" height="80vh">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            y: [-20, 20, -20, 20, -20], // Décalage vertical de l'animation
            x: [-10, 10, -10, 10, -10], // Décalage horizontal de l'animation
            opacity: 1,
            scale: 1,
          }}
          transition={{
            y: {
              repeat: Infinity, // Répéter l'animation indéfiniment
              duration: 25, // Durée d'une itération de l'animation (en secondes)
              ease: "easeInOut", // Courbe d'animation
            },
            x: {
              repeat: Infinity,
              duration: 30,
              ease: "easeInOut",
            },
            duration: 1,
            ease: "circOut",
            delay: 1,
          }}
        >
          {/* Cercle 1 */}
          <Box
            position={"absolute"}
            left={"65%"}
            top={"50px"}
            zIndex={0}
            w="300px"
            h="300px"
            borderRadius="100%"
            background="radial-gradient(circle at 16% 68%, rgba(10, 4, 101, 1) 0%, rgba(21, 12, 149, 1) 100%)"
            boxShadow={"0px 0px 40px 10px rgba(10, 4, 101, 1)"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            y: [20, -20, 20], // Décalage vertical de l'animation
            x: [-20, 20, -20],
            opacity: 1,
            scale: 1,
          }}
          transition={{
            y: {
              repeat: Infinity, // Répéter l'animation indéfiniment
              duration: 25, // Durée d'une itération de l'animation (en secondes)
              ease: "easeInOut", // Courbe d'animation
            },
            x: {
              repeat: Infinity,
              duration: 30,
              ease: "easeInOut",
            },
            duration: 1,
            ease: "circOut",
            delay: 0.5,
          }}
        >
          {/* Cercle 2 */}
          <Box
            position={"absolute"}
            top={"400px"}
            left={"30%"}
            zIndex={0}
            w="200px"
            h="200px"
            borderRadius="100%"
            background="radial-gradient(circle at 74% 40%, rgba(78, 68, 225, 1) 0%, rgba(45, 36, 178, 1) 100%)"
            boxShadow={"0px 0px 20px 0px rgba(78, 68, 225, 1)"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            y: [10, -10, 10], // Décalage vertical de l'animation
            x: [10, -10, 10], // Décalage horizontal de l'animation
            opacity: 1,
            scale: 1,
          }}
          transition={{
            y: {
              repeat: Infinity, // Répéter l'animation indéfiniment
              duration: 15, // Durée d'une itération de l'animation (en secondes)
              ease: "easeInOut", // Courbe d'animation
            },
            x: {
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut",
            },
            duration: 1,
            ease: "circOut",
            delay: 1.5,
          }}
        >
          {/* Cercle 3 */}
          <Box
            position={"absolute"}
            left={"10%"}
            top={"20px"}
            zIndex={0}
            w="100px"
            h="100px"
            borderRadius="100%"
            background="radial-gradient(circle at 19% 23%, rgba(180, 176, 244, 1) 0%, rgba(149, 142, 249, 1) 100%)"
            boxShadow={"0px 0px 10px 0px rgba(180, 176, 244, 1)"}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Bubble;
