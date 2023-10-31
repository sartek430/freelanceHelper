import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Bubble from "../components/Bubble";
import FreelanceHelperTitle from "../components/FreelanceHelperTitle";
import { useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [loginLoading, setLoginLoading] = useState(false);

  const signUpDivColor = useColorModeValue("#60656615", "#D9E4E505");
  const signUpDivBorderColor = useColorModeValue("#60656615", "#D9E4E505");

  const loginUser = async () => {
    setLoginLoading(true);
    if (email === "" || password === "") {
      toast({
        title: "Error",
        description: "Please enter valid credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoginLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error while logging in.",
        description: error.response.data.message[0],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error.message);
    }
    setLoginLoading(false);
  };

  return (
    <Box>
      {/* Titre */}
      <Flex justify="space-between">
        <FreelanceHelperTitle />
      </Flex>

      {/* Formulaire de connexion */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Flex
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          h="600px"
          w="500px"
          bg={signUpDivColor}
          border="1px solid"
          borderColor={signUpDivBorderColor}
          backdropFilter={"blur(30px)"}
          borderRadius="10"
          m="auto"
          zIndex={1}
        >
          <Text
            position="absolute"
            bg="#4E44E1"
            bgClip="text"
            fontSize="30px"
            fontWeight="500"
            top="15%"
            left="19%"
          >
            Welcome back!
          </Text>

          <Flex position="absolute" top="30%" left="19%" w="300px">
            <Box>
              <Input
                h="50"
                marginBottom="8"
                type="email"
                placeholder="Email"
                focusBorderColor="gray.500"
                borderColor="gray.500"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginUser();
                  }
                }}
              />

              <Input
                h="50"
                marginBottom="8"
                type="password"
                placeholder="Password"
                focusBorderColor="gray.500"
                borderColor="gray.500"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginUser();
                  }
                }}
              />

              <Button
                h="50"
                mt="8"
                mb={8}
                w="300px"
                color="#FFFFFF"
                variant="outline"
                bg={"#4E44E1"}
                _hover={{ bg: "#6B63EB", transform: "scale(1.05)" }}
                border="none"
                _active={{
                  bg: "#4E44E1",
                  transform: "scale(0.95)",
                }}
                type="submit"
                isLoading={loginLoading}
                onClick={() => loginUser()}
              >
                Log In
              </Button>

              <Text textAlign="center">
                <Text as="span">Don&apos;t have an account?</Text>{" "}
                <Link to="/signup">
                  <Text
                    as="span"
                    color="brand.500"
                    textDecoration={"underline"}
                    fontWeight={"bold"}
                  >
                    Sign Up
                  </Text>
                </Link>
              </Text>
            </Box>
          </Flex>
        </Flex>
      </motion.div>
      <Bubble />
    </Box>
  );
};

export default Login;
