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
import supabase from "../config/supabaseClient";
import zxcvbn from "zxcvbn";
import { isEmail } from "validator";
import { useColorModeValue } from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrengthScore, setPasswordStrengthScore] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const signUpDivColor = useColorModeValue("#60656615", "#D9E4E505");
  const signUpDivBorderColor = useColorModeValue("#60656615", "#D9E4E505");
  const showPasswordButtonColor = useColorModeValue("gray.300", "gray.700");
  const showPasswordButtonTextColor = useColorModeValue("gray.900", "gray.100");
  const showPasswordButtonHoverColor = useColorModeValue(
    "gray.400",
    "gray.600"
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrengthScore(zxcvbn(event.target.value).score);
    setIsPasswordVisible(newPassword !== "");
  };

  const createUser = async (event) => {
    event.preventDefault();
    // Vérifier que les champs ne sont pas vides
    if (password === "" || email === "") {
      toast({
        title: "Empty field",
        description: "Please fill in all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Vérifier que l'email est valide
    if (!isEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Vérifier la force du mot de passe
    if (passwordStrengthScore <= 3) {
      toast({
        title: "Password too weak",
        description: "Your password must be stronger.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // Afficher un message d'erreur à l'utilisateur et/ou gérer l'erreur
        console.error("Error during user creation:", error.message);

        if (error.message === "User already registered") {
          toast({
            title: "Error",
            description: "This email is already registered.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // Afficher un message de succès à l'utilisateur
        console.log("User created with success:", data);

        navigate("/dashboard");

        toast({
          title: "Account created",
          description: "Your account was successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error ", error);

      toast({
        title: "Error",
        description: "An error has occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // Afficher un message d'erreur à l'utilisateur
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
            <form onSubmit={createUser}>
              <Input
                h="50"
                marginBottom="8"
                type="email"
                placeholder="Email"
                focusBorderColor="gray.500"
                borderColor="gray.500"
                onChange={handleEmailChange}
              />

              <InputGroup alignItems="center">
                <Input
                  h="50"
                  marginBottom="4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  // Affiche une bordure rouge si le mot de passe est faible et verte s'il est fort et blanc s'il est vide
                  {...(passwordStrengthScore <= 3 && password !== ""
                    ? { focusBorderColor: "#B7133A", borderColor: "#B7133A" }
                    : passwordStrengthScore > 3
                    ? { focusBorderColor: "green", borderColor: "green" }
                    : {
                        focusBorderColor: "gray.500",
                        borderColor: "gray.500",
                      })}
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
                  y: isPasswordVisible ? 0 : -20,
                  opacity: isPasswordVisible ? 1 : 0,
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
                type="submit"
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
            </form>
          </Flex>
        </Flex>

        <Bubble />
      </motion.div>
    </Box>
  );
};

export default Signup;
