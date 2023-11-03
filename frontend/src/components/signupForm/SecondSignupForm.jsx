import React from "react";
import { Box, Button } from "@chakra-ui/react";

const SecondSignupForm = () => {
  return (
    <Box>
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
        //isLoading={registerLoading}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SecondSignupForm;
