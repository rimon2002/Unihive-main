import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link to={"/raihanrimon"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit my profile page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;
