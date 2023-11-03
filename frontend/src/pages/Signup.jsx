import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { BsArrowRightCircle } from "react-icons/bs";
//import { useNavigate } from "react-router-dom";
import Bubble from "../components/Bubble";
import FreelanceHelperTitle from "../components/FreelanceHelperTitle";
import { AnimatePresence, motion } from "framer-motion";

import { useColorModeValue } from "@chakra-ui/react";
//import axios from "axios";
import FirstSignupForm from "../components/signupForm/FirstSignupForm";
import SecondSignupForm from "../components/signupForm/SecondSignupForm";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //const toast = useToast();
  // const navigate = useNavigate();
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [rotateButton, setRotateButton] = useState(false);

  const signUpDivColor = useColorModeValue("#60656615", "#D9E4E505");
  const signUpDivBorderColor = useColorModeValue("#60656615", "#D9E4E505");

  const handleFirstSignupFormChange = (data) => {
    setEmail(data.email);
    setPassword(data.password);
    setName(data.name);
  };

  const handleIconClick = () => {
    // Incrémenter le compteur de clics
    showSecondSignupFormToggle();
    setClickCount(clickCount + 1);
    setRotateButton(true);
    // Si c'est le deuxième clic
    if (clickCount === 1) {
      setTimeout(() => {
        // Rotation d'un tour complet après un délai d'une seconde
        setRotateButton(false);
        setClickCount(0);
      }, 1000);
    }
  };

  const showSecondSignupFormToggle = () => {
    showSecondForm ? setShowSecondForm(false) : setShowSecondForm(true);
  };

  // const loginUser = async () => {
  //   setRegisterLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/login",
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );
  //     localStorage.setItem("token", response.data.access_token);
  //     setRegisterLoading(false);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast({
  //       title: "Error while logging in.",
  //       description: error.response.data.message[0],
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setRegisterLoading(false);
  //   }
  // };

  // const createUser = async () => {
  //   setRegisterLoading(true);
  //   if (!isCreateUserConditionValid()) {
  //     setRegisterLoading(false);
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       "http://localhost:3000/users",
  //       {
  //         name,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "ngrok-skip-browser-warning": "*",
  //         },
  //       }
  //     );
  //     toast({
  //       title: "Account created.",
  //       description: "We are trying to connect you.",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     loginUser();
  //   } catch (error) {
  //     console.error("Error while creating user: ", error);
  //     toast({
  //       title: "Error while creating user.",
  //       description: error.response.data.message[0],
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setRegisterLoading(false);
  //   }
  // };

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
          alignItems={"center"}
          justifyContent={"center"}
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
            top="10%"
            left="19%"
          >
            Create your account
          </Text>
          {showSecondForm ? (
            <SecondSignupForm />
          ) : (
            <FirstSignupForm onData={handleFirstSignupFormChange} />
          )}

          <Flex
            onClick={handleIconClick}
            _hover={{
              cursor: "pointer",
              fontSize: "65px",
              marginLeft: "5px",
              color: "brand.200",
            }}
            _active={{ fontSize: "60px" }}
            fontSize={"60px"}
            position={"absolute"}
            left="110%"
            zIndex={2}
            transform={rotateButton ? "rotate(180deg)" : ""}
            transition={"all 0.2s ease-out"}
          >
            <AnimatePresence>
              {email && password && name && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <BsArrowRightCircle />
                </motion.div>
              )}
            </AnimatePresence>
          </Flex>
        </Flex>

        <Bubble />
      </motion.div>
    </Box>
  );
};

export default Signup;
