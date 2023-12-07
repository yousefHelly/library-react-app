# library-react-app

This project is a MERN Stack library project . Follow the instructions below to set up and run the application.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

- Node.js: [Download and install Node.js](https://nodejs.org/)
  
- XAMPP: [Download and install XAMPP](https://www.apachefriends.org/index.html)

- Database file: [Download and import in XAMPP](https://drive.google.com/file/d/10tt2WEakaSY-y-SG610j-yu4P84iKPZz)
  
- Upload folder: [Download and Extract to library-react-app\server](https://drive.google.com/file/d/1M_iZdZ817VDRwPA1RsqGYvCFv0e4R2SW) 
## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yousefHelly/library-react-app.git

2. Navigate to the project directory:
   ```bach
   cd library-react-app
3. Install dependencies using npm:
   ```bach
   npm install
4. Navigate to the backend directory:
   ```bach
   cd server
5. Install backend dependencies:
   ```bach
   npm install
6. Set Up Upload Folder:
  - Navigate to the `server` directory within the project (`library-react-app\server`).
  - Unzip the contents of the `upload.rar` file in this directory. Ensure that the `upload` folder is located within the `library-react-app\server` directory.
7. Setting Up MySQL Database with XAMPP:
  - Start XAMPP and ensure that Apache and MySQL server are running.
  
  - Open the phpMyAdmin interface by visiting http://localhost/phpmyadmin/ in your web browser.
  
  - Create a new database for the project with the name ``library`` and Import the database file that contains all the necessary tables for the application to run.
## Running the App
Once the installation and database setup are complete, you need to run both the React app and the Express backend server. Open two separate terminals for the following steps:
  ### 1. Start the Vite React App (Frontend)
  
  Open a terminal and navigate to the project directory then run the following command to start the development server for the React app:
  ```bach
  npm run dev
  ```
  Visit http://localhost:5173 in your web browser to view the application.
  ### 2. Start the Express Backend Server

  Open another terminal and navigate to the ``server`` directory then run the Express backend server:
  ```bach
  npm run dev
  ```
  The backend server will be running at http://localhost:3000.

## Some Considerations
 This application does not have a user registration system. Instead, the admin has the ability to add, edit, or delete users. If you encounter any difficulties initially, use the following admin email and password to log in and create users later:
  - **Admin Email:**`youssefhelly@gmail.com`
  - **Admin Password:** `123456789`

    
I am currently considering the implementation of a user registration system in the near future.
## Contributing
  If you'd like to contribute to this project, please fork the repository and create a pull request. Ensure you follow the project's coding standards and guidelines.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/yousefHelly/library-react-app/blob/main/LICENSE) file for details.

