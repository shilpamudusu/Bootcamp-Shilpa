import React, { useState } from 'react';

interface Student {
  name: string;
  age: number;
}

const StudentList = () => {
  // Example usage of useState to manage student list
  const [students, setStudents] = useState<Student[]>([]);

  // Logic to add a new student (as an example)
  const addStudent = () => {
    setStudents([...students, { name: 'John Doe', age: 20 }]);
  };

  return (
    <div>
      <h1>Student List</h1>
      <button onClick={addStudent}>Add Student</button>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} - {student.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
