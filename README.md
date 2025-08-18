# Internship Management API
A RESTful backend system designed to simplify internship management by connecting students and companies. The API supports applying for internships, tracking applications, and managing postings, making it easier for both sides to interact efficiently.

## Features

  * **Student Functionality:**

    * Students can register and log in to their accounts.
    * After authorization, students can edit/update their profile details.
    * Students can view available internships and apply for them after updating their profile details.
   
 * **Company Functionality:** 

    * Companies can register and log in to their accounts.
   * After authorization, companies can post new internships and update existing ones.
   * Companies can view applications submitted by students for their posted internships.

## Tech Stack
* **Backend Framework:** Node.js + Express
* **Database:** MongoDB
* **Other Tools** Mongoose, JWT for authentication, bcrypt for password hashing

## Project Structure
```bash
Internship-Management-API/
│
├── controllers/   # Handles request and response logic
├── models/        # Defines MongoDB schemas and models
├── routes/        # API route definitions
├── middleware/    # Authentication and multer middlewares
├── validators/    # Validation functions for input fields
├── fileUpload/    # Utility for handling file uploads (Cloudinary)
├── uploads/       # Temporary storage for uploaded files
│
├── index.js       # Entry point of the application
│
├── .gitignore     # Specifies files and folders to be ignored by Git
├── README.md      # Project documentation
```


## API Endpoints  
### Student APIs
* `POST /student/register` → Register a student  
* `POST /student/login` → Login student  
* `PUT student/update/:studentID` → Update student  

### Company APIs
* `POST /company/register` → Register a company  
* `POST /company/login` → Login company  

### Internship APIs
* `POST /internship/postInternship/:companyId` → Company posts an internship  
* `PUT /internship/updateInternship/:internshipId` → Company updates an internship  
* `GET /internship/getInternship` → Student gets list of all internships  
* `GET /internship/getInternshipById/:internshipId` → Student gets details about a particular internship  

### Application APIs
* `POST /application/apply/:studentID` → Student applies for an internship  
* `GET /getAllAppliedStudents/:internshipId` → Company gets all applied students' applications  


## Postman Collection

You can test all APIs using the Postman Collection:
[Postman Collection](https://bit.ly/internship_management_API)

## Running internship application

To run the `internship` application, follow these steps:

1. Ensure that you have Node.js and npm installed on your system.

2. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Dipali127/internship_backend.git
    ```

3. Navigate to the root directory of the project:

    ```bash
   cd internship_backend
    ```

4. Install dependencies:


    ```bash
    npm install 
    ```

5. Set up any necessary environment variables. 

6. Start the application:

    ```bash
    npm start
    ```


**Before starting the application, ensure that you have set up the following:**

- **Environment Variables**: 
    - Create a new file named `.env` in the root directory of the project.
    - Set the following required environment variables in the `.env` file:
        - `PORT`: Set this variable to the desired port number. By default, the application listens on port 3000.
        - `DATABASE_CLUSTER_STRING`: Set the variable to the connection string for your MongoDB database cluster.
        - `secretKey`:  Set the variable to the secret key used for JWT authentication.
        - `cloudinary_credentials`: Set the CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET variables with your individual Cloudinary credentials for uploading files.

## Contributing
Contributions are welcome! If you’d like to improve this project, feel free to fork the repo and submit a pull request.  