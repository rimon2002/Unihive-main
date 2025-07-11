import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false); // State for showing student password
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    studentId: "",
    studentPassword: "", // New studentPassword field
    role: "Student", // Default role
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("user-Unihive-main", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* New Student ID Field */}
            <FormControl isRequired>
              <FormLabel>Student ID</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setInputs({ ...inputs, studentId: e.target.value })
                }
                value={inputs.studentId}
              />
            </FormControl>

            {/* New Student Password Field */}
            <FormControl isRequired>
              <FormLabel>Student Password</FormLabel>
              <InputGroup>
                <Input
                  type={showStudentPassword ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, studentPassword: e.target.value })
                  }
                  value={inputs.studentPassword}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowStudentPassword(
                        (showStudentPassword) => !showStudentPassword
                      )
                    }
                  >
                    {showStudentPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Role Selection */}
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <RadioGroup
                value={inputs.role}
                onChange={(value) => setInputs({ ...inputs, role: value })}
              >
                <Stack spacing={3} direction="column">
                  <Radio value="Student">Student</Radio>
                  <Radio value="Faculty">Faculty</Radio>
                  <Radio value="Alumni">Alumni</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
