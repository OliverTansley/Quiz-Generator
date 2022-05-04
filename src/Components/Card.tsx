import { HStack, Text, IconButton, Flex, VStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

type Props = {
  cards: string[];
  q: boolean;
};

const Card = (props: Props) => {
  let [currentCard, setCurrentCard] = useState(0);
  let [q, setQ] = useState(true);

  let changeCard: Function = (change: number) => {
    if (
      currentCard + change < 0 ||
      currentCard + change > props.cards.length - 1
    ) {
      change = 0;
    }
    setCurrentCard(currentCard + change);
  };

  useEffect(() => setCurrentCard(0), [props.cards]);

  return (
    <VStack>
      <HStack spacing={20}>
        <IconButton
          variant={"ghost"}
          onClick={() => {
            changeCard(-1);
          }}
          aria-label={""}
          icon={<ArrowLeftIcon boxSize={8} />}
        />

        <Flex
          overflowY={"clip"}
          p={2}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={
            "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;"
          }
          borderRadius={"20px 20px 20px 20px"}
          w={"600px"}
          h={"350px"}
          bg={"#dcdcdc"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setQ(!q);
          }}
        >
          {!props.cards[currentCard] ? null : q ? (
            <Text noOfLines={4} fontSize={"4xl"} color={"black"}>
              {props.cards[currentCard].split("\n-\n")[0]}
            </Text>
          ) : (
            <Text noOfLines={12} fontSize={"2xl"} color={"black"}>
              {props.cards[currentCard].split("\n-\n")[1]}
            </Text>
          )}
        </Flex>
        <IconButton
          variant={"ghost"}
          onClick={() => {
            changeCard(1);
          }}
          aria-label={""}
          icon={<ArrowRightIcon boxSize={8} />}
        />
      </HStack>
      <Text color={"gray"} paddingTop={8} fontSize={"2xl"}>
        {currentCard + 1}/{props.cards.length}
      </Text>
    </VStack>
  );
};

export default Card;
