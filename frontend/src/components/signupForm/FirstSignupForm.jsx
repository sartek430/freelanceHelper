import { React } from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";
import { useColorModeValue } from "@chakra-ui/react";

const FirstSignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordStrengthScore, setPasswordStrengthScore] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //const [registerLoading, setRegisterLoading] = useState(false);
  const showPasswordButtonColor = useColorModeValue("gray.300", "gray.700");
  const showPasswordButtonTextColor = useColorModeValue("gray.900", "gray.100");
  const showPasswordButtonHoverColor = useColorModeValue(
    "gray.400",
    "gray.600"
  );

  useEffect(() => {
    const dataToSend = {
      email: email,
      password: password,
      name: name,
    };
    props.onData(dataToSend);
  }, [email, password, name, props]);

  return (
    <Flex w="300px" mt={"80px"}>
      <Box>
        <Input
          h="50"
          marginBottom="8"
          type="text"
          placeholder="Name"
          focusBorderColor="gray.500"
          borderColor="gray.500"
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          h="50"
          marginBottom="8"
          type="email"
          placeholder="Email"
          focusBorderColor="gray.500"
          borderColor="gray.500"
          onChange={(e) => setEmail(e.target.value)}
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
          <Text color={passwordStrengthScore <= 3 ? "#B7133A" : "green"} mb="4">
            {/** Affiche un message en fonction de la force du mot de passe */}
            {passwordStrengthScore <= 3
              ? "Password too weak"
              : "Password strong"}
          </Text>
        </motion.div>

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
  );
};

export default FirstSignupForm;
