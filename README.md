# Notes Application

A MERN stack-like application designed for secure and efficient personal note-taking. Users can register, log in, create, view, edit, search, and pin their private notes.

## ✨ Features

* **User Authentication:** Secure registration and login using JSON Web Tokens (JWT) for authentication [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js].
* **CRUD Operations:** Full functionality to **C**reate, **R**ead, **U**pdate, and **D**elete notes [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js].
* **Note Pinning:** Easily pin important notes to the top of the dashboard for quick access [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js, om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/pages/Home.jsx].
* **Tagging System:** Organize notes with custom tags [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/components/TagInput.jsx].
* **Search Functionality:** Filter notes by matching keywords in the title, content, or tags [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js].
* **Client-Side Toast Notifications:** Provide instant feedback on user actions (e.g., "Note Added Successfully") [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/components/cards/Toast.jsx].
* **Note Sorting:** Sort notes by "New → Old" (default) or "Old → New" on the dashboard [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/pages/Home.jsx, om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/components/Navbar.jsx].

## 🛠️ Tech Stack

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | **React** (with **Vite**) | User Interface [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/package.json]. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/package.json]. |
| **Backend** | **Node.js** & **Express** | Runtime environment and web framework [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/package.json, om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Database** | **MongoDB** (via **Mongoose**) | Data persistence and ORM [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Authentication** | **JWT** (`jsonwebtoken`) | Stateless token-based authentication [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/utilities.js]. |

## 🚀 Setup & Installation

### Prerequisites

* Node.js (>= 18 recommended)
* MongoDB instance (local or cloud-hosted)

### 1. Backend Setup

1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your environment variables:
    ```
    MONGOOSE_URL="<YOUR_MONGODB_CONNECTION_STRING>"
    ACCESS_TOKEN_SECRET="<YOUR_SUPER_SECRET_KEY>"
    ```
    * The backend is configured to run on port `8080` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js].
4.  Start the server.
    ```bash
    npm run start
    # or if you have nodemon installed globally
    # nodemon index.js
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory.
    ```bash
    cd ../frontend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  The frontend is configured to use the backend URL `https://primetrade-ai-phi.vercel.app/` or `http://localhost:8080` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/frontend/src/utils/axiosInstance.js]. For local development, ensure the backend is running on port `8080`.
4.  Start the development server.
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

***

# API Documentation (Backend)

The backend exposes a RESTful API built with Express and secured with JWT (JSON Web Tokens) for most routes [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/utilities.js].

**Base URL (Local):** `http://localhost:8080`

**Authentication:** All protected routes require a JWT passed in the `Authorization` header as a **Bearer Token**: `Authorization: Bearer <accessToken>`.

## 🔒 Authentication Routes

### `POST /register`
| Field | Description |
| :--- | :--- |
| **Description** | Creates a new user account. |
| **Request Body** | `{ "name": "string", "email": "string", "password": "string" }` |
| **Success (200)** | `{ "error": false, "user": { ... }, "accessToken": "string", "message": "Registration Successful" }` |
| **Error (400)** | Missing fields or "User Already exists" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `POST /login`
| Field | Description |
| :--- | :--- |
| **Description** | Authenticates a user and returns an access token. |
| **Request Body** | `{ "email": "string", "password": "string" }` |
| **Success (200)** | `{ "error": false, "email": "string", "accessToken": "string", "message": "Login Successful" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (400)** | Missing fields, "User not found", or "Invalid Credentials" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `GET /getUser`
| Field | Description |
| :--- | :--- |
| **Description** | Retrieves the currently authenticated user's information. |
| **Authentication** | Required |
| **Success (200)** | `{ "user": { "name": "string", "email": "string", "_id": "string", "createdOn": "date" }, "message": "" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (401)** | Token is invalid or user is not found [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

## 📝 Note Management Routes

### `POST /add`
| Field | Description |
| :--- | :--- |
| **Description** | Adds a new note for the authenticated user. |
| **Authentication** | Required |
| **Request Body** | `{ "title": "string", "content": "string", "tags": ["string"] }` |
| **Success (200)** | `{ "error": false, "note": { ... }, "message": "Note added Succesfully" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (400)** | Missing `title` or `content` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `PUT /edit/:noteId`
| Field | Description |
| :--- | :--- |
| **Description** | Updates an existing note. Takes one or more optional fields for update. |
| **Authentication** | Required |
| **Path Parameter** | `noteId` (The ID of the note to edit) |
| **Request Body** | `{ "title": "string", "content": "string", "tags": ["string"], "isPinned": "boolean" }` (Partial payload) |
| **Success (200)** | `{ "error": false, "note": { ... }, "message": "Note updated successfully" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (400)** | "No changes provided" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js].|
| **Error (404)** | "Note not found" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `DELETE /delete/:noteId`
| Field | Description |
| :--- | :--- |
| **Description** | Deletes a note by its ID. |
| **Authentication** | Required |
| **Path Parameter** | `noteId` (The ID of the note to delete) |
| **Success (200)** | `{ "error": false, "message": "Note deleted successfully" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (404)** | "Note not found" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `PUT /pin/:noteId`
| Field | Description |
| :--- | :--- |
| **Description** | Toggles the pinned status of a note. |
| **Authentication** | Required |
| **Path Parameter** | `noteId` (The ID of the note to pin/unpin) |
| **Request Body** | `{ "isPinned": "boolean" }` |
| **Success (200)** | `{ "error": false, "note": { ... }, "message": "Note updated successfully" }` [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Error (404)** | "Note not found" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `GET /getAll`
| Field | Description |
| :--- | :--- |
| **Description** | Retrieves all notes for the authenticated user, sorted by pinned status first (`isPinned: -1`) [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Authentication** | Required |
| **Success (200)** | `{ "error": false, "notes": [{...}, {...}], "message": "All notes retrieved successfully" }` |
| **Error (500)** | "Internal Server Error" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |

### `GET /search`
| Field | Description |
| :--- | :--- |
| **Description** | Searches notes by matching the query against `title`, `content`, and `tags` (case-insensitive) [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
| **Authentication** | Required |
| **Query Parameter** | `query` (The search string) |
| **Example** | `/search?query=gym` |
| **Success (200)** | `{ "error": false, "notes": [{...}, {...}], "message": "Notes Retrieved successfully" }` |
| **Error (400)** | "Search query is required" [cite: om-govindani/primetrade.ai/Primetrade.ai-27e776d118afccfad9943a0404d22a558fd7dfbf/backend/index.js]. |
