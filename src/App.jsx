import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";

// Tambahkan .jsx di akhir path
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardUser from "./pages/DashboardUser.jsx";
import PengisianBiodata from "./pages/PengisianBiodata.jsx";
import Pengumuman from "./pages/Pengumuman.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardUser />} />
          <Route path="pengisian-biodata" element={<PengisianBiodata />} />
          <Route path="pengumuman" element={<Pengumuman />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
