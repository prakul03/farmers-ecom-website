import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SignInPage"; // Import SigninPage
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/homepage" element={<HomePage />} />
      {/* Add SigninPage route */}
    </Routes>
  );
}

export default App;
