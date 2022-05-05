import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Slide,
  VStack,
  HStack,
  Spacer,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  showTopics: boolean | undefined;
  toggle: any;
  setTopic: any;
  currentTopic: any;
};

const SideMenu = (props: Props) => {
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

  let topics: string[] | undefined = loadFile(
    "/Quiz-Generator/Decks/Summary.txt"
  )
    .split("-")
    .filter((item) => item !== "");

  return (
    <Slide direction="left" in={props.showTopics} style={{ zIndex: 10 }}>
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
        <HStack w={"100%"} paddingRight={6}>
          <Text fontSize={"4xl"}>Topics:</Text>
          <Spacer />
          <IconButton
            aria-label="toggleTopic"
            icon={<ChevronLeftIcon boxSize={8} />}
            variant={"ghost"}
            onClick={() => props.toggle()}
          />
        </HStack>
        {topics
          ? topics.map((topic: string) => {
              return props.currentTopic === topic ? (
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
                    props.setTopic(topic);
                    props.toggle();
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
                    props.setTopic(topic);
                    props.toggle();
                  }}
                >
                  {topic}
                </Button>
              );
            })
          : null}
      </VStack>
    </Slide>
  );
};

export default SideMenu;
