# Codeforces Profile Visualizer



https://github.com/user-attachments/assets/dd02862c-95ec-4a82-abc7-1f19885173c1



This project allows users to fetch and visualize Codeforces profile data. It supports full CRUD operations on user profiles, enriched with contest and problem-solving statistics.

## Features
- Add Codeforces users and fetch their data
- View contest history and problem-solving heatmap
- Edit or delete users
- View detailed profiles by handle
- Frontend built with React and Tailwind
- Backend built with Express and MongoDB

## API Endpoints
GET /profile/fetchAll  
Fetch all users from the database  
Response:  
- message: status message  
- data: list of all users  

POST /profile/save  
Save a new Codeforces user to the database  
Middlewares: fetchCodeforcesUserProfile, fetchProfileInformation, saveUserToDatabase  
Response:  
- message: status message  
- data: updated list of users  

PATCH /profile/edit  
Edit an existing user's information  
Middlewares: fetchProfileInformation, editUserinDatabase  
Response:  
- message: status message  
- data: updated list of users  

DELETE /profile/delete  
Delete a user from the database  
Middleware: deleteUserFromDatabase  
Response:  
- message: status message  
- allUsers: updated list of users  

GET /profile/:handle  
Fetch detailed profile data for a specific Codeforces handle  
Middleware: fetchOneUserFromDatabase  
Response:  
- message: status message  
- data: user profile with contest and problem-solving data  

## Folder Structure

- backend: Express server, MongoDB models, and route logic
- frontend: React application for visualizing user data
- services: API services and helper functions for both frontend and backend

## Tech Stack

- React  
- TailwindCSS  
- Express  
- Node.js  
- MongoDB  

## Setup Instructions

1. Clone the repository
2. Navigate into backend and frontend folders and install dependencies
3. Create `.env` files as required
4. Run backend and frontend servers
5. Access the demo frontend and test API endpoints
