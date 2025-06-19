Project Summary:
Unihive is a web-based platform designed for verified users to interact, create posts, message each other, and manage groups. The platform combines user authentication, real-time messaging, and group collaboration in one seamless interface.

Frontend:
React and Chakra UI are used to build the user interface, ensuring a modern and responsive experience.

User Authentication: Users can sign up and log in to the platform, where they are verified before gaining access to the features.

Messaging: Users can send messages to each other in real time, with conversation details updated dynamically.

Group Creation: Verified users can create groups, invite others, and manage group members.

Post Creation: Users can create and share posts on their profile, fostering community interaction.

Backend:
Node.js and Express serve as the backend, with MongoDB used for data storage (users, messages, posts, groups).

Socket.io enables real-time messaging, allowing instant updates to conversations and notifications.

User Management: The backend verifies users through a secure signup and login process, using JWT for token-based authentication.

API Endpoints:

/api/users: Handles user signup, login, and authentication.

/api/posts: Manages the creation and retrieval of user posts.

/api/messages: Allows users to send and receive messages in real-time.

/api/groups: Supports group creation, member management, and group details.

Key Features:
User Authentication: Users must sign up and log in to access the platform, with verification required for signup.

Real-Time Messaging: Users can send and receive messages instantly using Socket.io.

Post Creation: Users can create posts that are visible to others, allowing for community engagement.

Group Management: Users can create groups, add members, and manage group content.

Responsive Interface: The platform is built with a mobile-friendly design, ensuring usability across devices.

Secure Authentication: Using JWT tokens for secure, stateless authentication.

Technologies Used:
Frontend: React, Chakra UI, Axios, React Router, Recoil (for state management)

Backend: Node.js, Express, MongoDB, Mongoose, Socket.io, Cloudinary (for media uploads)

Development Tools: Git, GitHub, VS Code, Postman, Nodemon (for development)
