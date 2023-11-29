import React, { useState } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import SwitchButton from "../SwitchButton";
import { FaGears } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

const SecondSignupForm = (props) => {
  const [userType, setUserType] = useState("Freelancer");

  const handleToggleSwitchChange = (data) => {
    setUserType(data.userType);
  };

  const handleRegister = () => {
    const dataToSend = {
      userType: userType,
    };
    props.onData(dataToSend);
  };

  return (
    <Box>
      <Box fontSize={25} fontWeight={400} mb={"10"} ml={"20%"}>
        I am a{" "}
        <Box as="span" color="brand.200">
          {userType}
        </Box>
      </Box>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Flex
          justifyContent={"space-around"}
          position={"absolute"}
          width={"500px"}
        >
          <Box>
            <FaGears
              fontSize={70}
              color={userType === "Freelancer" ? "#FFFFFF" : "#3C3F40"}
            />
          </Box>
          <Box>
            <IoMdPerson
              fontSize={70}
              color={userType === "Freelancer" ? "#3C3F40" : "#FFFFFF"}
            />
          </Box>
        </Flex>
        <SwitchButton onData={handleToggleSwitchChange} />

        <Button
          h="50"
          mb="10"
          w="300px"
          mt={"100px"}
          color="#FFFFFF"
          variant="outline"
          bg={"#4E44E1"}
          _hover={{ bg: "#6B63EB", transform: "scale(1.05)" }}
          border="none"
          _active={{
            bg: "#4E44E1",
            transform: "scale(0.95)",
          }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
};

export default SecondSignupForm;
