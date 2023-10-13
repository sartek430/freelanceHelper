import React from "react";
import {
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Link,
  Text,
} from "@chakra-ui/react";
import { BiHomeAlt2 } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";

const SideBar = () => {
  const [collapse, setCollapse] = React.useState(false);

  const items = [
    {
      label: "Home",
      path: "freelanceHelper/home",
      icon: BiHomeAlt2,
    },
    {
      label: "Profile",
      path: "freelanceHelper/profile",
      icon: IoPersonOutline,
    },
    {
      label: "Settings",
      path: "freelanceHelper/settings",
      icon: LuSettings,
    },
  ];

  return (
    <HStack w="full" h="100vh">
      <Flex
        as="aside"
        w="full"
        h="full"
        maxW={collapse ? "96px" : "250px"}
        bg="gray.900"
        alignItems="center"
        flexDirection="column"
        p={4}
        justifyContent={"space-between"}
        transition="all 0.2s ease-out"
        onMouseEnter={() => setCollapse(false)}
        onMouseLeave={() => setCollapse(true)}
      >
        <Box w="full">
          <Box>
            <Link
              href="/freelanceHelper"
              as={Link}
              display="flex"
              alignItems="center"
              fontWeight="bold"
              whiteSpace="nowrap"
              fontSize={24}
              w="full"
              color="brand.100"
              _hover={{
                color: "brand.500",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "all 0.2s ease-out",
              }}
              justifyContent={"center"}
            >
              {!collapse ? <Text>Freelance Helper</Text> : <Text>FH</Text>}
            </Link>
          </Box>

          <Box
            h={1}
            w={"80%"}
            m={"auto"}
            bg="brand.500"
            borderRadius={10}
            mb={5}
          />
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>
                <NavItem
                  item={item}
                  isActive={index === 0}
                  collapse={collapse}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </HStack>
  );
};

export default SideBar;

const NavItem = ({ item, isActive, collapse }) => {
  const { icon, label, path } = item;

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius={8}
      justifyContent="center"
      bg={isActive ? "gray.800" : ""}
    >
      <Link
        href={path}
        as={Link}
        display="flex"
        gap={10}
        p={collapse ? "28px" : "4"}
        alignItems="center"
        fontWeight="medium"
        w="full"
        color={isActive ? "brand.500" : "gray.200"}
        _hover={{
          color: "brand.500",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 18,
          transition: "all 0.2s ease-out",
        }}
        justifyContent={collapse ? "center" : ""}
      >
        <Box
          w={2}
          h={10}
          position={"absolute"}
          left={4}
          bg={isActive ? "brand.500" : ""}
          borderRadius="full"
        />
        <List as={icon} fontSize={24} position="absolute" m={1} />
        {!collapse && <Text ml={collapse ? "" : "50px"}>{label}</Text>}
      </Link>
    </Box>
  );
};
