import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

// Import components and pages
import CreateGroup from "./components/CreateGroup"; // Import CreateGroup component
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import UserGroups from "./components/UserGroups"; // Import UserGroups component
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import GroupPage from "./pages/GroupPage"; // Import GroupPage component
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { SettingsPage } from "./pages/SettingsPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";

function App() {
  const user = useRecoilValue(userAtom); // Get user from recoil state
  const { pathname } = useLocation(); // Get current location path

  return (
    <Box position={"relative"} w="full">
      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
        <Header />
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />

          {/* Home Route */}
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />

          {/* Update Profile Route */}
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          {/* User Profile Route */}
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />

          {/* Post Route */}
          <Route path="/:username/post/:pid" element={<PostPage />} />

          {/* Group Routes */}
          <Route
            path="/groups"
            element={
              user ? <UserGroups userId={user._id} /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/create-group"
            element={
              user ? <CreateGroup userId={user._id} /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/group/:groupId"
            element={user ? <GroupPage /> : <Navigate to="/auth" />}
          />

          {/* Chat Route */}
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to="/auth" />}
          />

          {/* Settings Route */}
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
