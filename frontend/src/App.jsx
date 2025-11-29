import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* No Header */}
      <Routes>
        <Route path="/" element={<div>Test tanpa Header</div>} />
        <Route path="/login" element={<div>Test Login</div>} />
        <Route path="/register" element={<div>Test Register</div>} />
      </Routes>
    </Router>
  );
}
