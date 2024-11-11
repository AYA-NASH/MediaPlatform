# Media Sharing Platform

## Overview
The Media Sharing Platform is a web application built with a Node.js/Express backend and a React frontend.
This platform enables users to share, like, and interact with media posts such as images and videos.
Core functionalities include user authentication, CRUD operations for posts, and the ability to like/unlike content.

## Features
- User Management: Signup and Login functionality with user authentication.
- Media Content: CRUD operations for posts with support for image and video uploads.
- Interactions: Like/unlike functionality to engage with media content.
- RESTful API: Exposes RESTful endpoints for smooth front-end interaction.
- Validation and Error Handling: Ensures data integrity and provides meaningful feedback.

## Project Structure
### Backend (Node.js with Express)
- Controllers: Handles requests for users, posts, and likes.
- Models: Defines data models for user and post interactions.
- Routes: Configures endpoint routes for each API resource.
- Middleware: Adds validation and authentication to secure endpoints.

### Frontend (React)
- Components: Provides UI elements for user authentication and post interaction.
- State Management: Manages application state and interactions.
- UI/UX Enhancements: Ensures a responsive and user-friendly experience for viewing and interacting with posts.

## API Endpoints
### User Endpoints:
- POST `/auth/signup`: Register a new user
- POST `/auth/login`: User login

### Post Endpoints:
- GET `/home/posts`: Retrieve all posts
- POST `/home/post`: Create a new post
- PUT `/home/post/{id}`: Update a post
- DELETE `/home/post/{id}`: Delete a post

### Like Endpoints:
- GET `/like/{postId}`: Get all post's likes
- POST `/like/post/{postId}`: Like a post
- DELETE `/like/post/{postId}`: Unlike a post

## Development Status
- Basic user, post, and like routes are implemented.
- UI for user authentication, post management, and interactions are in place.
- Validation and error handling are in progress in both backend and frontend modules.

### Next Steps
- Complete validation and error handling.
- Add unit tests for improved reliability.
- Implement deployment with a CI/CD pipeline for automated deployment.
