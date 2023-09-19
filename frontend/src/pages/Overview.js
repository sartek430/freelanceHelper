import React from "react";
import { Box, Flex, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Bubble from "../components/Bubble";
import FreelanceHelperTitle from "../components/FreelanceHelperTitle";

const Overview = () => {
  return (
    <Box position={"relative"}>
      <Flex justify="space-between">
        {/*Titre*/}
        <FreelanceHelperTitle />

        <motion.div
          initial={{ opacity: 0, x: 50, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <ButtonGroup justifyContent="space-between" spacing="10" p="10">
            {/* Lien vers la page d'inscription */}
            <Link to="/signup">
              <Button
                bg="#958EF9"
                color="#0A0465"
                w="80px"
                h="50px"
                fontWeight="400"
                _hover={{ bg: "#6B63EB", transform: "scale(1.1)" }}
                _active={{
                  bg: "#6B63EB",
                  transform: "scale(0.9)",
                }}
              >
                SIGN UP
              </Button>
            </Link>

            {/* Lien vers la page de connexion */}
            <Link to="/login">
              <Button
                bg="#FFFFFF1A"
                w="80px"
                h="50px"
                fontWeight="400"
                color="#FFFFFF"
                _hover={{ bg: "#6B63EB", transform: "scale(1.1)" }}
                _active={{
                  bg: "#6B63EB",
                  transform: "scale(0.90)",
                }}
              >
                LOG IN
              </Button>
            </Link>
          </ButtonGroup>
        </motion.div>
      </Flex>

      {/* Titre */}
      <Flex
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <Text
            mt="8rem"
            textAlign="center"
            fontSize="65px"
            fontWeight="600"
            w="727px"
          >
            <Text
              as="span"
              bgGradient="linear(to-l, #2EC8DC, #4E44E1)"
              bgClip="text"
            >
              Launch your Project
            </Text>{" "}
            <Text as="span" color="primary">
              with our Freelancers
            </Text>
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "circOut", delay: 2 }}
        >
          <Text
            alignItems="center"
            justifyContent="center"
            color="#FFFFFF80"
            fontWeight="400"
            fontSize="24px"
            zIndex={1}
          >
            The all new interface for Freelancers and Customers
          </Text>
        </motion.div>
      </Flex>

      {/* Bulle */}
      <Bubble />
    </Box>
  );
};

export default Overview;
