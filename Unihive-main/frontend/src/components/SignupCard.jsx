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
  const [studentCredentials, setStudentCredentials] = useState({
    studentId: "",
    studentPassword: "",
  });
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Student", // Default role
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  // Dummy student ID and password
  const dummyStudentId = "student123";
  const dummyStudentPassword = "studentpass";

  const handleSignup = async () => {
    // If "Student" role is selected, validate student ID and password
    if (inputs.role === "Student") {
      if (
        studentCredentials.studentId !== dummyStudentId ||
        studentCredentials.studentPassword !== dummyStudentPassword
      ) {
        showToast("Error", "Invalid student ID or password", "error");
        return;
      }
    }

    try {
      // Add studentId and studentPassword to the request body if role is "Student"
      const formData =
        inputs.role === "Student"
          ? {
              ...inputs,
              studentId: studentCredentials.studentId,
              studentPassword: studentCredentials.studentPassword,
            }
          : inputs;

      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

            {/* Additional inputs for Student Role */}
            {inputs.role === "Student" && (
              <>
                <FormControl isRequired>
                  <FormLabel>Student ID</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setStudentCredentials({
                        ...studentCredentials,
                        studentId: e.target.value,
                      })
                    }
                    value={studentCredentials.studentId}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Student Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setStudentCredentials({
                        ...studentCredentials,
                        studentPassword: e.target.value,
                      })
                    }
                    value={studentCredentials.studentPassword}
                  />
                </FormControl>
              </>
            )}

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
