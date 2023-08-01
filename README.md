## Table Of Contant

### 1. About this repositorie
### 2. Technology used to build this repositorie
### 3. Api End-Points
### 4. Pagination 
### 5. Error Handling
### 6. Some Data Model And Sample Data

As you go through this repositore you should know some `important information` about it.So let's start with What this reposetory is all about.Shell we.

### 1. About Repositore :
This repositore created for a University to handle there student Admission,Faculty,Semesters. It is exectly like how a real university deal with there students. It is completely capable of handling `CRUD` oparation and `PAGINATION`. Besids that It handled `ERROR` response properly. Hope you like this repositore and give it a star.

### 2. Technology Stack:

- Used TypeScript as the programming language.
- Used Express.js as the web framework.
- Used Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.

### 3. Api End-Points

#### User As Student
   - api/v1/users/create-student (POST)
   - api/v1/student (GET)
   - api/v1/student/649f1f278a37b64bed3049d8 (Single GET) 
   - api/v1/student/649f1f278a37b64bed3049d8 (PATCH)
   - Can't Give You The Delete Route 


   #### Academic Semesters
   - api/v1/create-semesters/academic-semester (POST)
   - api/v1/create-semesters (GET)
   - api/v1/create-semesters/648e0e1185d6931768b671b6 (Single GET) 
   - api/v1/create-semesters/648e0e1185d6931768b671b6 (PATCH)
   - Can't Give You The Delete Route 


   #### Academic Faculty
   - api/v1/academic-faculty/create-faculty (POST)
   - api/v1/academic-faculty (GET)
   - api/v1/academic-faculty/64953f2cdc8ab2a008ff812c (Single GET) 
   - api/v1/academic-faculty/64953f2cdc8ab2a008ff812c (PATCH)
   - Can't Give You The Delete Route 


   #### Academic Department
   - api/v1/academic-department/create-department (POST)
   - api/v1/academic-department (GET)
   - api/v1/academic-department/6495405fbe41b26b2e6696d5 (Single GET) 
   - api/v1/academic-department/6495405fbe41b26b2e6696d5 (PATCH)
   - Can't Give You The Delete Route 
  

### 4. Pagination 

   ### Pagination and Filtering routes of Students

   - api/v1/student/?page=1&limit=10
   - api/v1/student/?sortBy=location&sortOrder=asc
   - api/v1/student/?location=Chattogram
   - api/v1/student/?searchTerm=afzal



Implement proper error handling throughout the application.
Use global error handling `middleware` to catch and handle errors, providing appropriate error responses with status codes and error messages.

Error Response Object Should include the following properties:
- success  →  false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages 
- stack

### 5 Sample Error Response

```json
   {
    "success": false,
    "statusCode": 400,
    "message": "Cast Error",
    "errorMessages": [
        {
            "path": "_id",
            "message": "CastError: Cast to ObjectId failed for value \"Y26I0100001\" (type string) at path \"_id\" for model \"AcademicSemester\"",
            "stack": "CastError: Cast to ObjectId failed for value \"Y26I0100001\" (type string) at path \"_id\" for model \"AcademicSemester\"\n    at ObjectId.cast (E:\\Next Level Programming\\mission 3\\mission 3 project\\node_modules\\mongoose\\lib\\schema\\objectid.js:248:11)\n    at ObjectId.SchemaType.applySetters at processTicksAndRejections (node:internal/process/task_queues:95:5)"
        }
    ],
    "stack": "The Message Property Is Same As Stack"
```


### 6 Few Of Project's Model And Sample Data For Post If You Want To Check                  

### Model: Student 

  - id: string
  - name: UserName //embedded object
  - gender: 'male' | 'female'
  - dateOfBirth: string
  - email: string
  - contactNo: string
  - emergencyContactNo: string
  - bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  - presentAddress: string
  - permanentAddress: string
  - guardian: Guardian // embedded object
  - localGuardian: LocalGuardian // embedded object
  - academicFaculty: Types.ObjectId | IAcademicFaculty // reference _id
  - academicDepartment: Types.ObjectId |    IAcademicDepartment // // reference _id
  - academicSemester: Types.ObjectId | IAcademicSemester // reference _id
  - profileImage?: string


  ### Sample Data Of Student For Post

```json 
{
    "password": "password123",     

    "student": {
        "name": {
            "firstName": "Afzal",
            "lastName": "mahmud"
        },
        "dateOfBirth": "01-01-2021",
        "gender": "male",
        "bloodGroup": "O+",
        "email": "user@gmail.com",
        "contactNo": "01756-0000000",
        "emergencyContactNo": "9999",
        "presentAddress": "sylhet",
        "permanentAddress": "sylhet",
        "academicFaculty": "64953f2cdc8ab2a008ff812c",
        "academicDepartment": "6495405fbe41b26b2e6696d5",
        "academicSemester": "648e0e1b85d6931768b671bc",
        "guardian": {
            "fatherName": "Mr. Abbu",
            "fatherOccupation": "Teacher",
            "fatherContactNo": "01713-000000",
            "motherName": "Mrs.Ammu",
            "motherOccupation": "Teacher",
            "motherContactNo": "01712-000000",
            "address": "sylhet"
        },
        "localGuardian": {
            "name": "same as above",
            "occupation": "same",
            "contactNo": "same",
            "address": "sylhet"
        }

      }
}```

  ### Model : Academic Semester
  - title: AcademicSemesterTitle
  - year: string
  - code: AcademicSemesterCode
  - startMonth: AcademicSemesterMonth
  - endMonth: AcademicSemesterMonth

### Sample Data 
```json
{
    "title": "Autumn",
    "year": "2029",
    "code": "03",
    "startMonth": "January",
    "endMonth": "May"
}
```

### Model : Academic Department

  - title: string
  - academicFaculty: Types.ObjectId | IAcademicFaculty
  ### Sample Data

  ```json
      {
    "title" : "department of Information Design",
    "academicFaculty" : "64c94693f9a97f49d9817fb0"
      }
  ```
