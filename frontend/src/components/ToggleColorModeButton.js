import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button
        onClick={() => toggleColorMode()}
        pos={"absolute"}
        top={"90%"}
        right={"0"}
        m={5}
        zIndex={"1"}
      >
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
}

export default ToggleColorModeButton;
