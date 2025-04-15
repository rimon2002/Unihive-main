import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={401}
        postImg="/Rimon.jpg"
        postTitle="This is my first post"
      />

      <UserPost
        likes={1200}
        replies={401}
        postImg="/Rimon.jpg"
        postTitle="Update the website....."
      />
    </>
  );
};

export default UserPage;
