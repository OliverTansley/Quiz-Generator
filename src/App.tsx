import React, { useState } from "react";

import "./App.css";

import {
  Button,
  ChakraProvider,
  Divider,
  HStack,
  VStack,
  Text,
  Spacer,
  IconButton,
  useDisclosure,
  Slide,
} from "@chakra-ui/react";
import Card from "./Components/Card";
import theme from "./theme";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SideMenu from "./Components/SideMenu";

function App() {
  function loadFile(filePath: any) {
    var result = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      result = xmlhttp.responseText;
    }
    return result;
  }

  let [currentTopic, setCurrentTopic] = useState("");
  const { isOpen, onToggle } = useDisclosure();

  let cards = loadFile("/Quiz-Generator/Decks/" + currentTopic + ".txt")
    .split("--\n")
    .filter((item) => item !== "");

  return (
    <ChakraProvider theme={theme}>
      <HStack h={"100vh"} spacing={0}>
        <SideMenu
          showTopics={isOpen}
          toggle={onToggle}
          setTopic={setCurrentTopic}
          currentTopic={currentTopic}
        />
        <Spacer />
        <VStack w={"100%"} p={4} h={"100%"}>
          <HStack w={"100%"}>
            <IconButton
              aria-label="toggleTopic"
              icon={<ChevronRightIcon boxSize={8} />}
              variant={"ghost"}
              onClick={() => onToggle()}
            />
          </HStack>
          <Spacer />
          {currentTopic !== "" ? (
            <VStack justifyContent={"center"} h={"100vh"} p={16}>
              <Text fontSize={"4xl"} color={"gray.400"}>
                {currentTopic}
              </Text>
              <Divider />
              <Spacer />
              <Card cards={cards} q={true} />
              <Spacer />
            </VStack>
          ) : (
            <Text color={"gray.300"} paddingTop={8} fontSize={"6xl"}>
              Select A topic!
            </Text>
          )}
          <Spacer />
        </VStack>
        <Spacer />
      </HStack>
    </ChakraProvider>
  );
}

export default App;
