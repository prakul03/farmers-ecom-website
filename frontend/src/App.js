import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage'; // Import SigninPage
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SigninPage />} /> {/* Add SigninPage route */}
      <Route path="/shop" element={<HomePage />} />
    </Routes>
  );
}

export default App;