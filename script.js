document.addEventListener('DOMContentLoaded', loadStudents); // Load students on page load

// Event listener for form submission
document.getElementById('student-registration').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing page

    // Get input values
    const name = document.getElementById('stdent-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    const email = document.getElementById('email-id').value.trim();
    const contact = document.getElementById('contact-no').value.trim();

    // Input validation
    if (!validateInputs(name, id, email, contact)) return;

    // Create student object
    const student = { name, id, email, contact };

    // Add student to local storage
    addStudentToLocalStorage(student);

    // Clear form after submission
    document.getElementById('student-registration').reset();

    // Refresh student list display
    loadStudents();
});

// Validate inputs function
function validateInputs(name, id, email, contact) {
    const nameRegex = /^[A-Za-z\s]+$/; // Validate name contains only letters and spaces
    const idRegex = /^[0-9]+$/; // Validate ID is a number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format
    const contactRegex = /^[0-9]+$/; // Validate contact is a number

    if (!name || !nameRegex.test(name)) {
        alert('Invalid name. Use letters only.');
        return false;
    }
    if (!id || !idRegex.test(id)) {
        alert('Invalid student ID. Use numbers only.');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        alert('Invalid email format.');
        return false;
    }
    if (!contact || !contactRegex.test(contact)) {
        alert('Invalid contact number. Use numbers only.');
        return false;
    }
    return true;
}

// Function to load students from local storage
function loadStudents() {
    const studentRecords = document.getElementById('students-records');
    studentRecords.innerHTML = ''; // Clear previous records

    const students = getStudentsFromLocalStorage();
    if (students.length === 0) {
        studentRecords.innerHTML = '<tr><td colspan="5">No students registered.</td></tr>';
        return;
    }

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentRecords.appendChild(row);
    });
}

// Function to get students from local storage
function getStudentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Function to add a student to local storage
function addStudentToLocalStorage(student) {
    const students = getStudentsFromLocalStorage();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to edit a student record
function editStudent(index) {
    const students = getStudentsFromLocalStorage();
    const student = students[index];

    // Populate form fields with the student's info
    document.getElementById('stdent-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('email-id').value = student.email;
    document.getElementById('contact-no').value = student.contact;

    // Remove the student record temporarily for editing
    deleteStudent(index);
}

// Function to delete a student record
function deleteStudent(index) {
    const students = getStudentsFromLocalStorage();
    students.splice(index, 1); // Remove the student at the index
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents(); // Refresh the student list display
}