import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Box textAlign="center">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Text
          as="i"
          fontSize="400px"
          fontWeight="bold"
          bgGradient="linear(to-l, #2EC8DC, #4E44E1)"
          bgClip="text"
        >
          404
        </Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <Text fontSize="50px" fontWeight="bold" color={"#4E44E1"}>
          Page not found
        </Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Text fontSize="20px" fontWeight="bold" color={"#4E44E1"}>
          The page you are looking for does not exist or has been moved.
        </Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <Button
          _hover={{ bg: "#2D24B2", transform: "scale(1.1)" }}
          border="none"
          _active={{
            bg: "#4E44E1",
            transform: "scale(0.9)",
          }}
          color="#FFFFFF"
          bg="#4E44E1"
          mx="auto"
          display="block"
          mt="20px"
        >
          <Link to="/">Go back to homepage</Link>
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFound;
