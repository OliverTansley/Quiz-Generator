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
} from "@chakra-ui/react";
import Card from "./Components/Card";
import theme from "./theme";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
  let [showTopics, setShowTopics] = useState(true);

  let topics: string[] | undefined = loadFile(
    "/Quiz-Generator/Decks/Summary.txt"
  )
    .split("-")
    .filter((item) => item !== "");

  let cards = loadFile("/Quiz-Generator/Decks/" + currentTopic + ".txt")
    .split("--\n")
    .filter((item) => item !== "");

  return (
    <ChakraProvider theme={theme}>
      <HStack h={"100vh"} spacing={0}>
        {!showTopics ? null : (
          <VStack
            bg={"#e6e6e6"}
            p={4}
            paddingBottom={0}
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 0px 16px -2px inset, rgba(0, 0, 0, 0.3) 0px 0px 36px -18px inset"
            }
            h={"100%"}
            minW={"356px"}
            w={"356px"}
            overflowY={"scroll"}
            alignItems={"flex-start"}
          >
            <Text fontSize={"4xl"}>Topics:</Text>

            {topics
              ? topics.map((topic: string) => {
                  return currentTopic === topic ? (
                    <Button
                      minH={"50px"}
                      fontSize="14px"
                      w={"300px"}
                      noOfLines={3}
                      bgColor={"orange.400"}
                      _hover={{ background: "orange.500" }}
                      title={topic}
                      colorScheme={"orange"}
                      onClick={() => {
                        setCurrentTopic(topic);
                        setShowTopics(false);
                      }}
                    >
                      {topic}
                    </Button>
                  ) : (
                    <Button
                      fontSize="14px"
                      minH={"50px"}
                      noOfLines={3}
                      w={"300px"}
                      colorScheme={"orange"}
                      title={topic}
                      variant={"outline"}
                      onClick={() => {
                        setCurrentTopic(topic);
                        setShowTopics(false);
                      }}
                    >
                      {topic}
                    </Button>
                  );
                })
              : null}
          </VStack>
        )}
        <Spacer />
        <VStack w={"100%"} p={4} h={"100%"}>
          <HStack w={"100%"}>
            <IconButton
              aria-label="toggleTopic"
              icon={
                showTopics ? (
                  <ChevronLeftIcon boxSize={8} />
                ) : (
                  <ChevronRightIcon boxSize={8} />
                )
              }
              variant={"ghost"}
              onClick={() => setShowTopics(!showTopics)}
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
