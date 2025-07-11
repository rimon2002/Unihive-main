// frontend/components/GroupPage.jsx
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const GroupPage = ({ groupId }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        console.error("Error fetching group details", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <div>
      {group ? (
        <>
          <Text fontSize="2xl">{group.name}</Text>
          <Text>{group.description}</Text>
          <Button>Post in Group</Button>
          {/* Additional features like adding members, posting, etc. */}
        </>
      ) : (
        <Text>Loading group details...</Text>
      )}
    </div>
  );
};

export default GroupPage;
