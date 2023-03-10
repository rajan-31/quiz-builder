# Quiz Builder

__*Watch demo video on [YouTube](https://youtu.be/WQMinmJKZ_c) or download from [here](/demo/demo-video.mp4)*__

<br />

This application has two components

1. Client - Nuxt.js (Single Page Application), Tailwindcss
2. Server - Express.js, MongoDB (API Server - REST)

### Functionalities

- User login and registration using email
- Logged in users can view quiz list and create new quizzes
- Permalink for every quiz (6 characters unique ID)
- Guest users can take quizzes with permalink
- API server now serving version 1 (client SPA using it)
- New API versions can be added without breaking previous versions

### Capabilities

- No limit for creating quizzes
- No limit for taking/solving quizzes
- Minimum 1 and max 10 questions in a quiz
- Question types: single option correct, multple options correct

### API Documentation

(To be added)

### Screenshots

Home Page

![](/demo/Home.png)

Login Page

![](/demo/Login.png)

Registration Page

![](/demo/Register.png)

New Quiz Page

![](/demo/Quiz%20Form.png)

Quiz Page

![](/demo/Quiz.png)

<!-- 
### Goals

- ~~allow authenticated users to create their own quizzes~~

- ~~anonymous visitors to take quiz and see how many questions they got right~~
- ~~register and sign in using email and password.~~
- ~~traditional login form, or use services such as Auth0 or Firebase Authentication (or any similar service)~~

\
\

- ~~Once a user signs in, they should be able to create a quiz~~
- ~~every quiz has a title and consists of 1-10 questions~~
- ~~Every question has 1-5 possible answer~~
    - ~~check this in api max 5 min 1~~
- ~~single correct answer, or a question where the visitor is expected to select all correct answers~~


\
\

-  ~~published quiz should have a __permalink__, a randomly generated sequence of __6 alphanumeric__ characters~~
- ~~People taking the quiz by following the permalink do not have to be authenticated~~
- ~~"You answered 5/8 questions correctly"~~
- ~~You are not required to record the visitor’s answers or test results~~

\
\

- ~~Every user only has access to their own list of quizzes~~
- ~~__Visitors should be aware of that MCQ and MSQ questions__~~
-  ~~Published quizzes can’t be edited anymore by the author, __only deleted__~~.

\
\

- ~~Application needs to have client and server components use NUXT js.~~
- ~~server component needs to expose a GraphQL or RESTful API. ~~
- ~~he client application needs to be a single-page application~~
- ~~fully server-side rendered fragment frameworks such as Turbolinks/Hotwire and similar is NOT acceptable~~
- ~~The API should not be coupled with the front-end application~~
- ~~if somebody wanted to build a different UI (eg. a mobile app) for the service - they should be able to do so without the server code being modified~~

\
\

- ~~Be mindful of the edge cases and unexpected scenarios.~~
- ~~Be mindful of security and data validation~~

\
\

- ~~Short project video - after you are done, please provide us with a simple and short video recording of the functionality~~
- ~~GIT repository~~
- 

 -->
