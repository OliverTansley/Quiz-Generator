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
  Box,
} from "@chakra-ui/react";
import Card from "./Components/Card";
import theme from "./theme";

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

  let topics: string[] | undefined = loadFile(
    "/Quiz-Generator/Decks/Summary.txt"
  )
    .split("-")
    .filter((item) => item !== "");

  let cards = loadFile("/Quiz-Generator/Decks/" + currentTopic + ".txt")
    .split("--")
    .filter((item) => item !== "");

  return (
    <ChakraProvider theme={theme}>
      <VStack h={"100%"}>
        <Box w={"100vw"} bg="orange.600" p={2}>
          <HStack paddingLeft={6} paddingRight={6}>
            <Text color={"white"} fontSize={"6xl"}>
              CSE Flash Cards
            </Text>
            <Spacer />
          </HStack>
        </Box>

        <HStack
          w={"100%"}
          h={"100px"}
          p={4}
          overflowX={"hidden"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          _hover={{ overflowX: "scroll" }}
        >
          {topics
            ? topics.map((topic: string) => {
                return currentTopic === topic ? (
                  <Button
                    h={"50px"}
                    w={"90px"}
                    minH={"50px"}
                    minW={"90px"}
                    colorScheme={"orange"}
                    onClick={() => {
                      setCurrentTopic(topic);
                    }}
                  >
                    {topic}
                  </Button>
                ) : (
                  <Button
                    h={"50px"}
                    w={"90px"}
                    minH={"50px"}
                    minW={"90px"}
                    colorScheme={"orange"}
                    variant={"outline"}
                    onClick={() => {
                      setCurrentTopic(topic);
                    }}
                  >
                    {topic}
                  </Button>
                );
              })
            : null}
        </HStack>
        <Divider />
        <Spacer />
        {currentTopic !== "" ? (
          <VStack p={32}>
            <Card cards={cards} q={true} />
          </VStack>
        ) : (
          <Text color={"gray.300"} paddingTop={8} fontSize={"6xl"}>
            Select A topic!
          </Text>
        )}
      </VStack>
    </ChakraProvider>
  );
}

export default App;
