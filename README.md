
# 🚀AUTO API 

## A powerful MERN stack-based web application that helps developers automatically generate fully functional backend API code without writing a single line of code.

## Introduction

The **AUTO API** is a web-based platform where users can visually design their API schema, controllers, and routes and export the backend code for a Node.js and MongoDB-powered API. The app allows users to specify data types, validation rules, and operations such as GET, POST, PUT, DELETE. At the click of a button, the user can download a fully optimized, tested, and ready-to-run backend project in a zip file.

## Description

In this application, developers can:

- 📋 Design MongoDB schemas, defining fields with types like string, integer, etc., and optional validation (required fields).
- 🛠️ Create unlimited collections/documents with custom names and attributes.
- ⚙️ Automatically generate all controller logic for handling CRUD operations.
- 🚦 Configure RESTful routes for each schema, supporting GET, POST, PUT, DELETE, and more.
- 💾 Download the generated project as a zip file, which contains everything needed to run the API, including models, controllers, routes, and `server.js`.
  
The generated code is highly optimized, with no need for the user to tweak or debug anything before running it. Simply install the required dependencies, start the server, and the API is ready to use.

---

## Screenshots

<p align="center">
  <img src="https://github.com/sufiyanpatel27/AutoAPI-frontend/blob/prod/src/assets/HomePage.png?raw=true" alt="Alt Text" width="400">
  <img src="https://github.com/sufiyanpatel27/AutoAPI-frontend/blob/prod/src/assets/SchemaPage.png?raw=true" alt="Alt Text" width="400">
  <img src="https://github.com/sufiyanpatel27/AutoAPI-frontend/blob/prod/src/assets/ControllerPage.png?raw=true" alt="Alt Text" width="400">
</p>

---

## Features 🌟

- **Schema Designer**: Users can visually create MongoDB schemas with options for different data types and validation rules.
- **Controller and Routes Generation**: Generates controller files for each schema, supporting all HTTP methods (GET, POST, PUT, DELETE).
- **Downloadable Project**: On clicking the "Code" button, the entire backend code (models, controllers, routes, `server.js`) is zipped and downloaded.
- **Ready to Run**: The generated code is fully optimized and tested, ensuring users can run the API immediately after installing the dependencies.
- **Customizable Requests**: Supports all types of HTTP requests (GET, POST, PUT, DELETE).
- **Unlimited Schemas**: Users can design and generate as many MongoDB documents (collections) as needed.
  
---

## Tech Stack 💻

- **Frontend**: React.js ⚛️
- **Backend**: Node.js, Express.js 🟢
- **Database**: MongoDB 🍃
- **Miscellaneous**: HTML5, CSS3, JavaScript, Mongoose (for MongoDB schema validation)

---

## Challenges Faced 🧠

- **Dynamic Code Generation**: Ensuring that the generated code is not only functional but also follows best practices in terms of structure and readability.
- **Schema Validation**: Implementing robust schema validation logic so that the generated API ensures data consistency.
- **File Compression**: Automatically zipping the generated code and serving it as a downloadable file was challenging from a backend implementation perspective.
- **User Experience**: Designing an intuitive UI for users to design their schemas, routes, and controllers visually without overwhelming them with options.
  
---

## Future Enhancements 🔮

- **Database Selection**: Extend support for additional databases like MySQL or PostgreSQL, allowing users to generate code for relational databases.
- **Middleware Support**: Enable users to add custom middleware for handling authentication, logging, or request validation.
- **Authentication**: Allow users to add user authentication (e.g., JWT-based) when generating code for secure APIs.
- **API Documentation Generation**: Automatically generate Swagger/OpenAPI documentation for the generated API.
- **Version Control Integration**: Allow users to directly push the generated code to GitHub or other version control platforms.
- **Live Preview**: Provide users with the ability to preview the generated code directly in the browser before downloading.
  
---

## Installation 🔧

### Prerequisites
- Node.js (version 14.x or higher) 🟢
- MongoDB (local or remote instance) 🍃

### Steps to Run the Generated Code

1. **Extract the Zip File**: After downloading, extract the zip file which contains `models`, `controllers`, `routes`, and a `server.js` file.
2. **Install Dependencies**: Navigate to the project directory and run the following command to install dependencies:
   ```bash
   npm install
   ```
3. **Run the Server**: Start the server by running:
   ```bash
   node server.js
   ```
4. **Test the API**: Your API will be running locally at `http://localhost:5000`. You can test the routes using tools like Postman or cURL.

---

## Usage 📦

1. **Design Your Schema**: Use the UI to define MongoDB collections with fields and data types (string, integer, etc.).
2. **Define Controllers**: Specify which routes (GET, POST, PUT, DELETE) you need for each schema.
3. **Download the Code**: Click on the "Code" button to download a zip file containing the auto-generated backend code.
4. **Run the API**: Extract the zip, install dependencies, and start the server.

---

## Resources 📚

- [React](https://reactjs.org/) ⚛️
- [Node.js](https://nodejs.org/) 🟢
- [Express.js](https://expressjs.com/) 🚀
- [MongoDB](https://www.mongodb.com/) 🍃
- [Mongoose](https://mongoosejs.com/) 🗃️

---

## License ⚖️

This project is licensed under the MIT License.
