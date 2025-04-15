import {
  Avatar,
  Flex,
  Image,
  Text,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w="full" alignItems="center" gap={3}>
          <Avatar src="/post1.JPG" size="md" name="raihan rimon" />

          <Flex>
            <Text fontSize="sm" fontWeight="bold">
              raihanrimon
            </Text>
            <Image src="/Chest-logo-01.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems="center">
          <Text fontSize="sm" color="gray.light">
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>This is our First University Project</Text>

      <Box
        borderRadius={6}
        overflow="hidden"
        border="1px solid"
        borderColor="gray.light"
      >
        <Image src="/iron.png" w="full" />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems="center">
        <Text color="gray.light" fontSize="sm">
          2768 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
        <Text color="gray.light" fontSize="sm">
          {2000 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>

      <Divider my={4} />

      <Flex justifyContent="space-between">
        <Flex gap={2} alignItems="center">
          <Text fontSize="2xl">👍</Text>
          <Text color="gray.light">
            In this website you connect with our alumni, friends and you can
            post, comment and chat with each other.
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      <Comment
        comment="Looks good"
        createdAt="2d"
        likes={43}
        username="johndoe"
        userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
      />
      <Comment
        comment="Looks good"
        createdAt="2d"
        likes={43}
        username="johndoe"
        userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863"
      />
      <Comment
        comment="Looks good"
        createdAt="2d"
        likes={43}
        username="johndoe"
        userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c"
      />
    </>
  );
};

export default PostPage;
