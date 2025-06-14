# Team 22 Full Stack Hobby Recommendation App

This is a full-stack application deployed on Google Cloud that allows authenticated users to manage, generate, and cache hobbies using Firebase Auth, Google Gemini, and Redis.

Live site: [https://team22.cs144.org](https://team22.cs144.org)

## Authentication

All API endpoints require the user to be authenticated via **Firebase Authentication** and to include a **valid Bearer token** in the `Authorization` header of requests.

```http
Authorization: Bearer <firebase_id_token>
```
# API Reference
---

### `GET /hobbies`
**Description:** Retrieve all hobbies for the authenticated user.
**Response:**
```json
[
  {
    "id": "abc123",
    "name": "Photography",
    "category": "Art",
    "difficulty": "Medium",
    "progress": 20,
    "completed": false
  }
]
```

---

### `GET /hobby/:hobbyId`
**Description:** Fetch a specific hobby by ID.
**Response:**
```json
{
  "id": "abc123",
  "name": "Photography",
  "category": "Art",
  "difficulty": "Medium",
  "progress": 20,
  "completed": false
}
```

---

### `POST /save-Hobby`
**Description:** Save a new hobby to the database.
**Request Body:**
```json
{
  "name": "Knitting",
  "category": "Craft",
  "difficulty": "Easy"
}
```
**Response:**
```json
{
  "id": "new_id",
  "name": "Knitting",
  "category": "Craft",
  "difficulty": "Easy",
  "progress": 0,
  "completed": false
}
```

---

### `PATCH /update-hobby/:hobbyId`
**Description:** Update a specific hobby by ID.
**Request Body:**
```json
{
  "progress": 75,
  "completed": true
}
```
**Response:**
```json
{
  "message": "Hobby updated successfully."
}
```

---

### `DELETE /delete-hobby/:hobbyId`
**Description:** Delete a specific hobby by ID.
**Response:**
```json
{
  "message": "Hobby deleted successfully."
}
```

---

### `GET /recommend-Hobby`
**Description:** Use Gemini AI to generate a new hobby based on user's existing hobbies.
**Response:**
```json
{
  "name": "Pottery",
  "category": "Craft",
  "difficulty": "Medium",
  "progress": 0,
  "completed": false
}
```

---

### `GET /cached-hobbies`
**Description:** Retrieve cached hobby recommendations from Redis.
**Response:**
```json
[
  {
    "name": "Origami",
    "category": "Craft",
    "difficulty": "Easy",
    "progress": 0,
    "completed": false
  }
]
```

---

### `POST /cache-recommended-hobby`
**Description:** Store a hobby recommendation in the Redis cache.
**Request Body:**
```json
{
  "name": "Origami",
  "category": "Craft",
  "difficulty": "Easy",
  "progress": 0,
  "completed": false
}
```
**Response:**
```json
{
  "message": "Cached user hobby"
}
```

---

For full app functionality, make sure the user is authenticated using Firebase and the token is included in API calls.

## Deployment Instructions

### Prerequisites
- Node.js 20+
- Docker + Docker Buildx
- GCP Project with:
  - Artifact Registry
  - GKE Cluster
  - Redis Deployment
  - Static IP & HTTPS Certificate (for Ingress)
- Firebase Project with Authentication enabled

### Environment Variable
These are passed via GitHub Actions secrets or Docker build args:

Frontend:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_DEV_BACKEND_URL
VITE_PROD_BACKEND_URL
```

Backend:
```
PORT
FIREBASE_CREDENTIALS_PATH
GOOGLE_APPLICATION_CREDENTIALS
REDIS_URL
```

### CI/CD with GitHub Actions
The `build-and-deploy` job does the following:
- Authenticates with GCP
- Builds and pushes Docker images
- Applies Kubernetes configs (frontend, backend, redis, ingress)
- Restarts deployments to fetch latest images
