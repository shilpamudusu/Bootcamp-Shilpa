import React, { Suspense, lazy } from 'react';

const StudentList = lazy(() => import('./features/studentList'));

function App() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <StudentList />
      </Suspense>
    </div>
  );
}

export default App;
