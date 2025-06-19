import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const currentUser = useRecoilValue(userAtom); // Get the current user
  const showToast = useShowToast();
  const navigate = useNavigate();

  // Example list of users (In practice, this should be fetched from an API)
  const allUsers = [
    { _id: "1", username: "User1" },
    { _id: "2", username: "User2" },
    { _id: "3", username: "User3" },
  ];

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) {
      showToast(
        "Error",
        "Please provide a group name and select participants",
        "error"
      );
      return;
    }

    try {
      // You would send this data to your backend API to create the group
      const groupData = {
        groupName,
        participants: [currentUser._id, ...selectedUsers], // Include current user in the group
      };

      const res = await fetch("/api/messages/groups", {
        method: "POST",
        body: JSON.stringify(groupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newGroup = await res.json();
      if (newGroup.error) {
        showToast("Error", newGroup.error, "error");
        return;
      }

      showToast("Success", "Group created successfully!", "success");
      navigate("/chat"); // Redirect to the chat page after creation
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Create a Group
      </Text>
      <Stack spacing={3}>
        <Input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Select
          placeholder="Select Participants"
          multiple
          value={selectedUsers}
          onChange={(e) =>
            setSelectedUsers([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          {allUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </Select>
        <Button onClick={handleCreateGroup}>Create Group</Button>
      </Stack>
    </Box>
  );
};

export default CreateGroupPage;
