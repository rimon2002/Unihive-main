import { Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const UserGroups = ({ userId }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`/api/groups/user/${userId}`);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups", error);
      }
    };

    fetchGroups();
  }, [userId]);

  return (
    <div>
      <Stack spacing={4}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group._id}>
              <Text fontSize="lg">{group.name}</Text>
              <Text>{group.description}</Text>
              <Button>Join Group</Button>
            </div>
          ))
        ) : (
          <Text>No groups found</Text>
        )}
      </Stack>
    </div>
  );
};

export default UserGroups;
