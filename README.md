# Smoke Lab (**Server**)

![Server](https://img.shields.io/badge/Server-Smoke_Lab-brightgreen)
![Status](https://img.shields.io/badge/Status-Complete-yellow)
![Self Development](https://img.shields.io/badge/Project-Self_Development-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

This project represents the server-side code for the Smoke Lab store system. The server is built using Node.js, leveraging various libraries for enhanced functionality.

## Table of Contents

-  [Folder Structure](#folder-structure)
-  [Usage](#usage)
-  [Contributing](#contributing)
-  [Dependencies](#dependencies)

## Folder Structure

-  **certificates:** Stores SSL certificate files for securing the server.
-  **controllers:** Contains controller functions for handling different routes.
-  **models:** Contains MongoDB schema models for data storage.
-  **.env:** Environment variables configuration.

## Usage

1. Clone the repository:

```bash
git clone https://github.com/HEAD0223/smoke-lab-node.git
cd smoke-lab-node
```

2. Install dependencies:

```bash
npm install
```

3. Add .env:

```bash
DB_LINK='MONGODBLINK'
GMAIL_USER=USER
GMAIL_PASS=PASSWORD
```

4. Start the Node.js server:

```bash
npm start
```

5. The server should be running on the specified port (default is 8080).

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## Dependencies

-  **cors:** Middleware for enabling CORS in the server.
-  **dotenv:** Loads environment variables from a .env file.
-  **express:** Web application framework for Node.js.
-  **fs:** File system module for handling file operations.
-  **https:** Module for creating HTTPS servers.
-  **mongoose:** MongoDB object modeling for Node.js.
-  **nodemailer:** Module for sending emails.
-  **nodemon:** A tool that helps in the development of Node.js-based applications by automatically restarting the server.

Make sure to include these dependencies in your project.
