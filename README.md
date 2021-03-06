# QCFirst

## Link to website:
[Login Page](https://qc-first.herokuapp.com/) <br>
[Student Home After Logging In](https://qc-first.herokuapp.com/html/studentHome.html) <br>
[Instructor Home After Logging In](https://qc-first.herokuapp.com/html/instructorHome.html) <br>

## Designed by James Mancuso, Zian Khan

## Contributions (Pages worked/completed)

### James 
  - index.html  (html)  
  - new_user.html  (html/css) 
  - studentEnroll.html  (html/css)
  - instructorRoster.html (html/css)
  - new_user.js  (js)
  - package.json
  - package-lock.json
  - timer.js
  - server.js
  - middlewares.js

### Zian
  - index.html (css)
  - forgot.html  (html/css)
  - instructorEnroll.html  (html/css)
  - instructorHome.html  (html/css)
  - studentHome.html  (html/css)
  - images for all pages
  - responsiveness for all pages
  - enroll.js
  - data.json

### Both
  - Header  (html/css)
  - Footer  (html/css)
  - style.css  (html/css)
  - Implemented Bulma's CSS Framework throughout the webpage
  - admin page (html/css)
  - html/css validations 
  - README.md

<!--
You and your partner should commit and push your visual designs to your GitHub repository (QCFirst). You should then create a README (instructions below) including your visual designs and any other information you want to include about your site (features, contributors, purpose of the website, etc).
--> 
<!--
## Purpose:
<p>QCFirst was made to serve as a way for students and instructors to manage their courses (whether that included adding, dropping). Students and Instructors have the ability to view their schedules and to obtain more information about courses. </p>
-->

## Login Page
![mobileLogin](./img/mobile/login.png)
![tabletLogin](./img/tablet/login.png)
![desktopLogin](./img/desktop/login.png)

<p>Features: When a user logins, it redirects them to the home page. When a user forgets their password/username, it redirects them to the forgot password/username page. When a user wants to signup, it redirects them to the New Uer page.</p>


## Forgot User/Password Page
![mobileForgotUser](./img/mobile/forgot_username.png)
![mobileForgotUser](./img/mobile/forgot_password.png)
![tabletForgotUserPass](./img/tablet/forgot_user_password.png)
![desktopForgotUserPass](./img/desktop/forgot_user_pass.png)


<p>Note: For mobile version, there is 2 screen states for the forgot username/password BUT they are on the same page, the user would just scroll down to find fill the forgot password information out. </p>

## New User Page
![mobileNew](./img/mobile/create_user.png)
![tabletNew](./img/tablet/new_user.png)
![desktopNew](./img/desktop/new_user.png)


## Student Home Page 

![mobileHome](./img/mobile/student_home.png)
![mobileHomeDrop](./img/mobile/student_home_drop.png)
![tabletHome](./img/tablet/student_home1.png)
![tabletHomeDrop](./img/tablet/student_home2.png)
![desktopHome](./img/desktop/student_home.png)
![desktopHomeDrop](./img/desktop/student_home_drop.png)

<p> Features: When a student clicks the drop course button, a checklist pops up which allows a user to select which courses they would like to drop. The courses they would like to drop, they would have to confirm this by re-clicking the drop courses button. When a student clicks the add course button, it redirects them to the student enrollment page. </p>

<p>For the mobile version, the user has the same functionality, however, a problem we've considered is there may not be enough text space to display a students full course, so what we can is shorten the class name to display just the section and class number. (Consideration: Make it so a user can click on the class and it extends the schedule to display the rest of the information about the course).</p>


## Instructor Home Page
![mobileInstructorHome](./img/mobile/instructor_home1.png)
![mobileInstructorDrop](./img/mobile/instructor_home2.png)
![tabletInstructorHome](./img/tablet/instructor_home1.png)
![tabletInstructorHomeDrop](./img/tablet/instructor_home2.png)
![desktopInstructorHome](./img/desktop/instructor_home1.png)
![desktopInstructorHomeDrop](./img/desktop/instructor_home2.png)


<p> Features: When a instructor clicks the drop course button, a checklist pops up which allows a user to select which courses they would like to drop. The courses they would like to drop, they would have to confirm this by re-clicking the drop courses button. When a instructor clicks the create course button, it redirects them to the instructor management page. </p>

<p>For the mobile version, the user has the same functionality, however, a problem we've considered is there may not be enough text space to display a students full course, so what we can is shorten the class name to display just the section and class number. (Consideration: Make it so a user can click on the class and it extends the schedule to display the rest of the information about the course).</p>

## Student Enrollment Page
![mobileEnroll1](./img/mobile/student_enroll_filter.png)
![mobileEnroll2](./img/mobile/student_enroll_nonfilter.png)
![mobileEnroll3](./img/mobile/student_enroll_failed.png)
![mobileEnroll4](./img/mobile/student_enroll_sucess.png)
![tabletEnroll1](./img/tablet/student_enroll1.png)
![tabletEnroll2](./img/tablet/student_enroll2.png)
![tabletEnroll3](./img/tablet/student_enroll3.png)
![desktopEnroll1](./img/desktop/student_enroll1.png)
![desktopEnroll2](./img/desktop/student_enroll2.png)
![desktopEnroll3](./img/desktop/student_enroll3.png)

<p>Features: When a user wants to obtain more information about a class, they click the box that contains the class they are interested in and it'll extend to show the rest of the information about the course. When a user is able/unable to join a course, a popup will occur.</p>

<p>Note: When a class is full, the add button is removed so a student wouldn't have the opportunity to join the class.</p>

<p>For Mobile Version: Unlike the desktop and tablet version, the user will have the chance to show/hide filter. To enable or hide the filter, the user would click the filter button. Also, the mobile will have the chance to "apply" the filter by clicking a button which will hide the filter and then display the screen of courses.</p>


## Instructor Management Page
![mobileEnroll](./img/mobile/instructor_enroll1.png)
![mobileEnroll2](./img/mobile/instructor_enroll2.png)
![tabletEnroll](./img/tablet/instructor_enroll1.png)
![tabletEnroll2](./img/tablet/instructor_enroll2.png)
![desktopEnroll](./img/desktop/instructor_1.png)
![desktopEnroll2](./img/desktop/instructor_2.png)

<p>Features: Instructors have the ability to create courses here. If the course creation is successful, a popup will state that the course was created successfully. </p>

## Choice of Frontend
<p>HTML, CSS, and a CSS Framework called "Bulma"</p>

## Choice of Backend
<p>Node.js and Express</p>

## Choice of Database Management System
<p>MySQL</p>

## Difference between our visual design and the final outcome
<p>The final outcome of our website consisted of a simpler design. We removed a few features (forgot username/password page, filter on the left side of the website) and we added an admin page. In addition, because we removed the filter, we moved the search bar from the original visual design to above the courses on the student enroll page. </p>
