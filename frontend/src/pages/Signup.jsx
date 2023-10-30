import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Bubble from "../components/Bubble";
import FreelanceHelperTitle from "../components/FreelanceHelperTitle";
import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";
import { isEmail, isStrongPassword } from "validator";
import { useColorModeValue } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Johe");
  const [passwordStrengthScore, setPasswordStrengthScore] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);

  const signUpDivColor = useColorModeValue("#60656615", "#D9E4E505");
  const signUpDivBorderColor = useColorModeValue("#60656615", "#D9E4E505");
  const showPasswordButtonColor = useColorModeValue("gray.300", "gray.700");
  const showPasswordButtonTextColor = useColorModeValue("gray.900", "gray.100");
  const showPasswordButtonHoverColor = useColorModeValue(
    "gray.400",
    "gray.600"
  );

  const isCreateUserConditionValid = () => {
    if (
      password !== "" &&
      email !== "" &&
      name !== "" &&
      isEmail(email) &&
      isStrongPassword(password)
    ) {
      return true;
    } else {
      toast({
        title: "Error",
        description: "Please enter valid credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };

  const loginUser = async () => {
    setRegisterLoading(true);
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
      setRegisterLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error while logging in.",
        description: error.response.data.message[0],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setRegisterLoading(false);
    }
  };

  const createUser = async () => {
    setRegisterLoading(true);
    if (!isCreateUserConditionValid()) {
      setRegisterLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/users",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "*",
          },
        }
      );
      toast({
        title: "Account created.",
        description: "We are trying to connect you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      loginUser();
    } catch (error) {
      console.error("Error while creating user: ", error);
      toast({
        title: "Error while creating user.",
        description: error.response.data.message[0],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setRegisterLoading(false);
    }
  };

  return (
    <Box>
      {/* Titre */}
      <Flex justify="space-between">
        <FreelanceHelperTitle />
      </Flex>

      {/* Formulaire d'inscription */}
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
            bg="brand.500"
            bgClip="text"
            fontSize="30px"
            fontWeight="500"
            top="15%"
            left="19%"
          >
            Create your account
          </Text>

          <Flex position="absolute" top="30%" left="19%" w="300px">
            <Box>
              <Input
                h="50"
                marginBottom="8"
                type="text"
                placeholder="Name"
                focusBorderColor="gray.500"
                borderColor="gray.500"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createUser();
                  }
                }}
              />

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
                    createUser();
                  }
                }}
              />

              <InputGroup alignItems="center">
                <Input
                  h="50"
                  marginBottom="4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordStrengthScore(zxcvbn(e.target.value).score);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createUser();
                    }
                  }}
                  // Affiche une bordure rouge si le mot de passe est faible et verte s'il est fort et grise s'il est vide
                  focusBorderColor={
                    password.length === 0
                      ? "gray.500"
                      : passwordStrengthScore <= 3
                      ? "red.500"
                      : "green.500"
                  }
                  borderColor={
                    password.length === 0
                      ? "gray.500"
                      : passwordStrengthScore <= 3
                      ? "red.500"
                      : "green.500"
                  }
                  _hover={
                    password.length === 0
                      ? { borderColor: "gray.600" }
                      : passwordStrengthScore <= 3
                      ? { borderColor: "red.500" }
                      : { borderColor: "green.500" }
                  }
                />
                {/* affiche un bouton qui affiche ou non le mot de passe */}
                <InputRightElement width="auto" m="5px">
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    bg={showPasswordButtonColor}
                    _hover={{ bg: showPasswordButtonHoverColor }}
                    _active={{ bg: showPasswordButtonHoverColor }}
                    color={showPasswordButtonTextColor}
                    border="1px solid"
                    borderColor={showPasswordButtonColor}
                    backdropFilter={"blur(10px)"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: password.length ? 0 : -20,
                  opacity: password.length ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Text
                  color={passwordStrengthScore <= 3 ? "#B7133A" : "green"}
                  mb="4"
                >
                  {/** Affiche un message en fonction de la force du mot de passe */}
                  {passwordStrengthScore <= 3
                    ? "Password too weak"
                    : "Password strong"}
                </Text>
              </motion.div>

              <Button
                h="50"
                mb="10"
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
                onClick={() => createUser()}
                isLoading={registerLoading}
              >
                Sign Up
              </Button>

              <Text textAlign="center">
                <Text color="brand" as="span">
                  Have an account?
                </Text>{" "}
                <Link to="/login">
                  <Text
                    as="span"
                    color={"brand.500"}
                    textDecoration={"underline"}
                    fontWeight={"bold"}
                  >
                    Log In
                  </Text>
                </Link>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Bubble />
      </motion.div>
    </Box>
  );
};

export default Signup;
