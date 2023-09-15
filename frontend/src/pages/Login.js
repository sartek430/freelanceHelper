import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Bubble from "../components/Bubble";
import FreelanceHelperTitle from "../components/FreelanceHelperTitle";
import supabase from "../config/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      console.error("Veuillez remplir tous les champs");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erreur de connexion:", error.message);
        // Afficher un message d'erreur à l'utilisateur
      } else {
        navigate("/dashboard");
        console.log("Utilisateur connecté avec succès:", data);
        // Rediriger l'utilisateur vers une autre page ou effectuer d'autres actions après la connexion réussie
      }
    } catch (error) {
      console.error("Une erreur s'est produite:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
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
          bg="#FFFFFF05"
          border="1px solid #FFFFFF05"
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
            <form onSubmit={loginUser}>
              <Input
                h="50"
                marginBottom="8"
                type="email"
                placeholder="Email"
                color="#FFFFFF"
                onChange={handleEmailChange}
              />

              <Input
                h="50"
                marginBottom="8"
                type="password"
                placeholder="Password"
                color="#FFFFFF"
                onChange={handlePasswordChange}
              />

              <Flex justifyContent={"end"}>
                <Link to="/dsqibh">
                  <Text textDecoration={"underline"} color="#FFFFFF">
                    Forgot Password
                  </Text>
                </Link>
              </Flex>

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
              >
                Log In
              </Button>

              <Text textAlign="center">
                <Text color="#FFFFFF" as="span">
                  Don't have an account?
                </Text>{" "}
                <Link to="/signup">
                  <Text
                    as="span"
                    color="#8CECF9"
                    textDecoration={"underline"}
                    fontWeight={"bold"}
                  >
                    Sign Up
                  </Text>
                </Link>
              </Text>
            </form>
          </Flex>
        </Flex>
      </motion.div>
      <Bubble />
    </Box>
  );
};

export default Login;
