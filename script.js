document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // LOGIN / SIGNUP (Firebase)
    // ==================================================

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleForm = document.getElementById("toggleForm");

    if (toggleForm) {

        toggleForm.addEventListener("click", function (event) {

            event.preventDefault();

            const isLoginVisible = loginForm.style.display !== "none";

            if (isLoginVisible) {
                loginForm.style.display = "none";
                signupForm.style.display = "block";
                toggleForm.textContent = "Already have an account? Login";
            } else {
                loginForm.style.display = "block";
                signupForm.style.display = "none";
                toggleForm.textContent = "Don't have an account? Sign Up";
            }

        });

    }

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            window.firebaseLogin(email, password)
                .then(function () {
                    alert("Login Successful! Welcome to SUMS.");
                    window.location.href = "dashboard.html";
                })
                .catch(function (error) {
                    alert("Login Failed: " + error.message);
                });

        });

    }

    if (signupForm) {

        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value.trim();

            window.firebaseSignUp(email, password)
                .then(function () {
                    alert("Account Created! You can now login.");
                    signupForm.reset();
                    signupForm.style.display = "none";
                    loginForm.style.display = "block";
                    toggleForm.textContent = "Don't have an account? Sign Up";
                })
                .catch(function (error) {
                    alert("Signup Failed: " + error.message);
                });

        });

    }


    // ==================================================
    // STUDENT MANAGEMENT
    // ==================================================

    const studentForm = document.getElementById("studentForm");

    if (studentForm) {

        const studentTableBody =
            document.getElementById("studentTableBody");

        const searchStudent =
            document.getElementById("searchStudent");

        const defaultStudents = [
            {
                name: "Ibrahim Junejo",
                roll: "IT-001",
                email: "ibrahim@sums.com",
                department: "IT"
            },
            {
                name: "Musa",
                roll: "IT-002",
                email: "musa@sums.com",
                department: "IT"
            }
        ];

        let students =
            JSON.parse(localStorage.getItem("students"));

        if (!Array.isArray(students)) {
            students = [];
        }

        defaultStudents.forEach(function (defaultStudent) {

            const exists = students.some(function (student) {
                return student.roll === defaultStudent.roll;
            });

            if (!exists) {
                students.push(defaultStudent);
            }

        });

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        function displayStudents(studentList = students) {

            studentTableBody.innerHTML = "";

            studentList.forEach(function (student) {

                studentTableBody.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td>${student.email}</td>
                        <td>${student.department}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteStudent('${student.roll}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        studentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const student = {

                name:
                    document
                        .getElementById("studentName")
                        .value.trim(),

                roll:
                    document
                        .getElementById("rollNumber")
                        .value.trim(),

                email:
                    document
                        .getElementById("studentEmail")
                        .value.trim(),

                department:
                    document
                        .getElementById("department")
                        .value

            };

            students.push(student);

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            studentForm.reset();

            displayStudents();

        });


        searchStudent.addEventListener("input", function () {

            const value = this.value.toLowerCase();

            const filtered = students.filter(function (student) {

                return (
                    student.name.toLowerCase().includes(value) ||
                    student.roll.toLowerCase().includes(value)
                );

            });

            displayStudents(filtered);

        });


        window.deleteStudent = function (roll) {

            students = students.filter(function (student) {

                return student.roll !== roll;

            });

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            displayStudents();

        };


        displayStudents();

    }


    // ==================================================
    // FACULTY / TEACHER MANAGEMENT
    // ==================================================

    const teacherForm = document.getElementById("teacherForm");

    if (teacherForm) {

        const teacherTableBody =
            document.getElementById("teacherTableBody");

        const searchTeacher =
            document.getElementById("searchTeacher");

        const defaultTeachers = [
            {
                name: "Ma'am Chandini Talpur",
                id: "T-101",
                email: "chandini@sums.com",
                department: "IT"
            },
            {
                name: "Dr. Sharafuddin Talpur",
                id: "T-102",
                email: "sharafuddin@sums.com",
                department: "IT"
            },
            {
                name: "Ma'am Kainat",
                id: "T-103",
                email: "kainat@sums.com",
                department: "IT"
            },
            {
                name: "Ma'am Sidratul Muntah",
                id: "T-104",
                email: "sidratul@sums.com",
                department: "IT"
            },
            {
                name: "Ma'am Sabira",
                id: "T-105",
                email: "sabira@sums.com",
                department: "IT"
            }
        ];

        let teachers =
            JSON.parse(localStorage.getItem("teachers"));

        if (!Array.isArray(teachers)) {
            teachers = [];
        }

        defaultTeachers.forEach(function (defaultTeacher) {

            const exists = teachers.some(function (teacher) {
                return teacher.id === defaultTeacher.id;
            });

            if (!exists) {
                teachers.push(defaultTeacher);
            }

        });

        localStorage.setItem(
            "teachers",
            JSON.stringify(teachers)
        );


        // TEACHER TABLE
        function displayTeachers(teacherList = teachers) {

            teacherTableBody.innerHTML = "";

            teacherList.forEach(function (teacher) {

                teacherTableBody.innerHTML += `
                    <tr>
                        <td>${teacher.name}</td>
                        <td>${teacher.id}</td>
                        <td>${teacher.email}</td>
                        <td>${teacher.department}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteTeacher('${teacher.id}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        // ADD TEACHER
        teacherForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const teacher = {

                name:
                    document
                        .getElementById("teacherName")
                        .value.trim(),

                id:
                    document
                        .getElementById("teacherId")
                        .value.trim(),

                email:
                    document
                        .getElementById("teacherEmail")
                        .value.trim(),

                department:
                    document
                        .getElementById("teacherDepartment")
                        .value.trim()

            };

            teachers.push(teacher);

            localStorage.setItem(
                "teachers",
                JSON.stringify(teachers)
            );

            teacherForm.reset();

            displayTeachers();

        });


        // SEARCH TEACHER
        searchTeacher.addEventListener("input", function () {

            const value = this.value.toLowerCase();

            const filtered = teachers.filter(function (teacher) {

                return (
                    teacher.name.toLowerCase().includes(value) ||
                    teacher.id.toLowerCase().includes(value) ||
                    teacher.email.toLowerCase().includes(value) ||
                    teacher.department.toLowerCase().includes(value)
                );

            });

            displayTeachers(filtered);

        });


        // DELETE TEACHER
        window.deleteTeacher = function (id) {

            teachers = teachers.filter(function (teacher) {

                return teacher.id !== id;

            });

            localStorage.setItem(
                "teachers",
                JSON.stringify(teachers)
            );

            displayTeachers();

        };


        displayTeachers();

    }


    // ==================================================
    // COURSE MANAGEMENT
    // ==================================================

    const courseForm = document.getElementById("courseForm");

    if (courseForm) {

        const courseTableBody =
            document.getElementById("courseTableBody");

        const searchCourse =
            document.getElementById("searchCourse");

        const defaultCourses = [
            {
                name: "OOP",
                code: "WD-102",
                department: "IT",
                teacher: "Ma'am Chandini Talpur",
                semester: "2nd",
                credits: "3"
            },
            {
                name: "DLD",
                code: "WD-103",
                department: "IT",
                teacher: "Ma'am Chandini Talpur",
                semester: "2nd",
                credits: "3"
            },
            {
                name: "Sufism & Modern Science",
                code: "WD-104",
                department: "IT",
                teacher: "Dr. Sharafuddin Talpur",
                semester: "2nd",
                credits: "3"
            },
            {
                name: "Mathematics Foundation",
                code: "WD-105",
                department: "IT",
                teacher: "Ma'am Kainat",
                semester: "2nd",
                credits: "2"
            },
            {
                name: "Pakistan Studies",
                code: "PS-101",
                department: "IT",
                teacher: "Ma'am Sidratul Muntah",
                semester: "2nd",
                credits: "2"
            },
            {
                name: "Islamic Studies",
                code: "IS-101",
                department: "IT",
                teacher: "Ma'am Sabira",
                semester: "2nd",
                credits: "2"
            }
        ];

        let courses =
            JSON.parse(localStorage.getItem("courses"));

        if (!Array.isArray(courses)) {
            courses = [];
        }

        defaultCourses.forEach(function (defaultCourse) {

            const exists = courses.some(function (course) {
                return course.code === defaultCourse.code;
            });

            if (!exists) {
                courses.push(defaultCourse);
            }

        });

        localStorage.setItem(
            "courses",
            JSON.stringify(courses)
        );


        function displayCourses(courseList = courses) {

            courseTableBody.innerHTML = "";

            courseList.forEach(function (course) {

                courseTableBody.innerHTML += `
                    <tr>
                        <td>${course.name}</td>
                        <td>${course.code}</td>
                        <td>${course.department}</td>
                        <td>${course.teacher}</td>
                        <td>${course.semester}</td>
                        <td>${course.credits}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteCourse('${course.code}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        courseForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const course = {

                name:
                    document
                        .getElementById("courseName")
                        .value.trim(),

                code:
                    document
                        .getElementById("courseCode")
                        .value.trim(),

                department:
                    document
                        .getElementById("courseDepartment")
                        .value,

                teacher:
                    document
                        .getElementById("courseTeacher")
                        .value.trim(),

                semester:
                    document
                        .getElementById("courseSemester")
                        .value,

                credits:
                    document
                        .getElementById("courseCredits")
                        .value

            };

            courses.push(course);

            localStorage.setItem(
                "courses",
                JSON.stringify(courses)
            );

            courseForm.reset();

            displayCourses();

        });


        searchCourse.addEventListener("input", function () {

            const value = this.value.toLowerCase();

            const filtered = courses.filter(function (course) {

                return (
                    course.name.toLowerCase().includes(value) ||
                    course.code.toLowerCase().includes(value) ||
                    course.teacher.toLowerCase().includes(value)
                );

            });

            displayCourses(filtered);

        });


        window.deleteCourse = function (code) {

            courses = courses.filter(function (course) {

                return course.code !== code;

            });

            localStorage.setItem(
                "courses",
                JSON.stringify(courses)
            );

            displayCourses();

        };


        displayCourses();

    }


    // ==================================================
    // DEPARTMENT MANAGEMENT
    // ==================================================

    const departmentForm =
        document.getElementById("departmentForm");

    if (departmentForm) {

        const departmentTableBody =
            document.getElementById("departmentTableBody");

        const searchDepartment =
            document.getElementById("searchDepartment");

        let departments =
            JSON.parse(localStorage.getItem("departments")) || [];


        function displayDepartments(
            departmentList = departments
        ) {

            departmentTableBody.innerHTML = "";

            departmentList.forEach(function (department) {

                departmentTableBody.innerHTML += `
                    <tr>
                        <td>${department.name}</td>
                        <td>${department.code}</td>
                        <td>${department.head}</td>
                        <td>${department.students}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteDepartment('${department.code}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        departmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const department = {

                    name:
                        document
                            .getElementById("departmentName")
                            .value.trim(),

                    code:
                        document
                            .getElementById("departmentCode")
                            .value.trim(),

                    head:
                        document
                            .getElementById("departmentHead")
                            .value.trim(),

                    students:
                        document
                            .getElementById("studentCount")
                            .value

                };

                departments.push(department);

                localStorage.setItem(
                    "departments",
                    JSON.stringify(departments)
                );

                departmentForm.reset();

                displayDepartments();

            }
        );


        searchDepartment.addEventListener(
            "input",
            function () {

                const value = this.value.toLowerCase();

                const filtered = departments.filter(
                    function (department) {

                        return (
                            department.name
                                .toLowerCase()
                                .includes(value) ||

                            department.code
                                .toLowerCase()
                                .includes(value) ||

                            department.head
                                .toLowerCase()
                                .includes(value)
                        );

                    }
                );

                displayDepartments(filtered);

            }
        );


        window.deleteDepartment = function (code) {

            departments = departments.filter(
                function (department) {

                    return department.code !== code;

                }
            );

            localStorage.setItem(
                "departments",
                JSON.stringify(departments)
            );

            displayDepartments();

        };


        displayDepartments();

    }


    // ==================================================
    // ATTENDANCE MANAGEMENT
    // ==================================================

    const attendanceForm =
        document.getElementById("attendanceForm");

    if (attendanceForm) {

        const attendanceTableBody =
            document.getElementById("attendanceTableBody");

        const searchAttendance =
            document.getElementById("searchAttendance");

        let attendanceRecords =
            JSON.parse(
                localStorage.getItem("attendanceRecords")
            ) || [];


        function displayAttendance(
            recordList = attendanceRecords
        ) {

            attendanceTableBody.innerHTML = "";

            recordList.forEach(function (record) {

                attendanceTableBody.innerHTML += `
                    <tr>
                        <td>${record.student}</td>
                        <td>${record.roll}</td>
                        <td>${record.course}</td>
                        <td>${record.date}</td>
                        <td>${record.status}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteAttendance('${record.roll}', '${record.date}', '${record.course}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        attendanceForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const record = {

                    student:
                        document
                            .getElementById("attendanceStudent")
                            .value.trim(),

                    roll:
                        document
                            .getElementById("attendanceRoll")
                            .value.trim(),

                    course:
                        document
                            .getElementById("attendanceCourse")
                            .value,

                    date:
                        document
                            .getElementById("attendanceDate")
                            .value,

                    status:
                        document
                            .getElementById("attendanceStatus")
                            .value

                };

                attendanceRecords.push(record);

                localStorage.setItem(
                    "attendanceRecords",
                    JSON.stringify(attendanceRecords)
                );

                attendanceForm.reset();

                displayAttendance();

            }
        );


        searchAttendance.addEventListener(
            "input",
            function () {

                const value = this.value.toLowerCase();

                const filtered = attendanceRecords.filter(
                    function (record) {

                        return (
                            record.student
                                .toLowerCase()
                                .includes(value) ||

                            record.roll
                                .toLowerCase()
                                .includes(value)
                        );

                    }
                );

                displayAttendance(filtered);

            }
        );


        window.deleteAttendance = function (
            roll,
            date,
            course
        ) {

            attendanceRecords =
                attendanceRecords.filter(
                    function (record) {

                        return !(
                            record.roll === roll &&
                            record.date === date &&
                            record.course === course
                        );

                    }
                );

            localStorage.setItem(
                "attendanceRecords",
                JSON.stringify(attendanceRecords)
            );

            displayAttendance();

        };


        displayAttendance();

    }


    // ==================================================
    // RESULTS MANAGEMENT
    // ==================================================

    const resultForm =
        document.getElementById("resultForm");

    if (resultForm) {

        const resultTableBody =
            document.getElementById("resultTableBody");

        const searchResult =
            document.getElementById("searchResult");

        let results =
            JSON.parse(localStorage.getItem("results")) || [];


        function getGrade(marks) {

            if (marks >= 80) return "A+";
            if (marks >= 70) return "A";
            if (marks >= 60) return "B";
            if (marks >= 50) return "C";
            if (marks >= 40) return "D";

            return "F";

        }


        function displayResults(resultList = results) {

            resultTableBody.innerHTML = "";

            resultList.forEach(function (result) {

                const grade = getGrade(result.marks);

                const status =
                    result.marks >= 40
                        ? "Pass"
                        : "Fail";


                resultTableBody.innerHTML += `
                    <tr>
                        <td>${result.student}</td>
                        <td>${result.roll}</td>
                        <td>${result.course}</td>
                        <td>${result.marks}</td>
                        <td>${grade}</td>
                        <td>${status}</td>
                        <td>
                            <button
                                class="action-btn"
                                onclick="deleteResult('${result.roll}', '${result.course}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        }


        resultForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const marks = Number(
                    document
                        .getElementById("resultMarks")
                        .value
                );


                const result = {

                    student:
                        document
                            .getElementById("resultStudent")
                            .value.trim(),

                    roll:
                        document
                            .getElementById("resultRoll")
                            .value.trim(),

                    course:
                        document
                            .getElementById("resultCourse")
                            .value,

                    marks: marks

                };


                results.push(result);

                localStorage.setItem(
                    "results",
                    JSON.stringify(results)
                );

                resultForm.reset();

                displayResults();

            }
        );


        searchResult.addEventListener(
            "input",
            function () {

                const value = this.value.toLowerCase();

                const filtered = results.filter(
                    function (result) {

                        return (
                            result.student
                                .toLowerCase()
                                .includes(value) ||

                            result.roll
                                .toLowerCase()
                                .includes(value)
                        );

                    }
                );

                displayResults(filtered);

            }
        );


        window.deleteResult = function (
            roll,
            course
        ) {

            results = results.filter(
                function (result) {

                    return !(
                        result.roll === roll &&
                        result.course === course
                    );

                }
            );

            localStorage.setItem(
                "results",
                JSON.stringify(results)
            );

            displayResults();

        };


        displayResults();

    }

});
