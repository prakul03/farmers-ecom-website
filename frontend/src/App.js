import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SigninPage"; // Ensure consistent naming

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  );
}
export default App;
