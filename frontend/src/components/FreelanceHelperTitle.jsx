import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FreelanceHelperTitle = () => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        whileHover={{ scale: 1.1, transition: { duration: 0.25 } }}
      >
        <Link to="/freelanceHelper">
          <Text fontWeight="400" fontSize="30px" color="#4E44E1" m="10">
            FREELANCE HELPER
          </Text>
        </Link>
      </motion.div>
    </Box>
  );
};

export default FreelanceHelperTitle;
