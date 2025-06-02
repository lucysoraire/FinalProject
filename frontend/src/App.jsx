import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PatientInfo from "./pages/PatientInfo/PatientInfo";
import ScrollToHashElement from "./components/ScrollToHash";
import ForgotPasswordPage from "./pages/LoginPage/ForgotPassword"; 
import ResetPasswordPage from "./pages/LoginPage/ResetPassword";

import "./App.css";

function App() {
  return (
    <div className="app">
      <ScrollToHashElement />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/turno" element={<AppointmentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/info" element={<PatientInfo />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
