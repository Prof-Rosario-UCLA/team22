# Team 22 Full Stack Hobby Recommendation App

This is a full-stack application deployed on Google Cloud that allows authenticated users to manage, generate, and cache hobbies using Firebase Auth, Google Gemini, and Redis.

Live site: [https://team22.cs144.org](https://team22.cs144.org)

## Authentication

All API endpoints require the user to be authenticated via **Firebase Authentication** and to include a **valid Bearer token** in the `Authorization` header of requests.

```http
Authorization: Bearer <firebase_id_token>
