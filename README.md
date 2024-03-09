
## TASK-BUDDY
## Introduction
The Task Manager application is a platform designed to help users organize and manage their tasks effectively. It provides features for creating, updating, and deleting tasks, along with filtering options based on task status. The project aims to streamline task management processes and enhance productivity for individuals or teams.
## Assumptions :
Users have basic familiarity with task management concepts.
Users expect a responsive and intuitive interface for managing tasks.

The application assumes a single-user environment, without complex user authentication and authorization requirements.

The focus is on functionality and user experience rather than advanced features like collaboration or real-time updates.



## Steps to set up the project
   

## Run Locally


Clone the project

```bash
  git clone https://github.com/bhaskar552/Task-Buddy.git
```
Go to the .env file in backend folder and paste you own mongodb url and access-token-secret

```bash
  MONGODB_URL = "you url"
  ACCESS_TOKEN_SECRET = "your token"


```


Go to the root directory of this project in your terminal 

```bash
  cd Task-Buddy
```

Go to backend folder

```bash
  cd backend
```
Install the dependencies

```bash
  npm install
```
Start the backend

```bash
  npm start
```
Open another terminal and 
Go to frontend folder

```bash
  cd frontend
```
Install the dependencies

```bash
  npm install
```
start frontend
```bash
  npm start
```
It's important to note that these steps assume that you have Node.js and npm (Node Package Manager) installed on your system. If you don't have these tools installed, you'll need to download and install them first before following the above steps.



## Implemented Features

  Task Management: Users can create, read, update, and delete tasks with a title, description, and status (e.g., "To Do," "In Progress," "Done").

User Interface: The application provides a user-friendly interface with forms for task creation, a task list with status updates and deletions, and filtering options based on task status.

Form Validation: Implemented form validation to ensure that tasks cannot be created without a title, enhancing data integrity.

Responsive Design: The application is designed to be responsive, ensuring optimal usability across various devices and screen sizes.

RESTful API: The backend offers a RESTful API for handling CRUD operations on tasks, following industry-standard conventions.

Data Storage: Tasks are stored in a database system (MongoDB) with appropriate data models to represent task attributes.

Validation and Error Handling: Server-side validation is implemented to validate task data before saving it to the database, with proper error handling mechanisms in place.

## Additional Features
Searching: Searching capabilities are implemented to allow users to find and organize tasks more efficiently.



## Tech Used

Frontend: HTML, CSS, JavaScript, React.js for building the user interface, with support from Tailwind CSS for styling.

Backend: Node.js with Express.js framework for API development, MongoDB for data storage, and Mongoose for MongoDB object modeling.

Version Control: Git for version control, with GitHub or GitLab for hosting the repository.


The provided instructions and documentation aim to facilitate the setup and understanding of the Task Manager project, enabling reviewers to assess its functionality, code quality, user experience, security measures, testing coverage, and any implemented bonus features effectively.
