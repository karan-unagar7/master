import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayOut from "./components/Layout";
import StudentModule from "./components/routes/StudentModule";
import StaffModule from "./components/routes/StaffModule";
import AdminModule from "./components/routes/AdminModule";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import NoPage from "./components/NoPage";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Private routes for authenticated users */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<LayOut />}>
            <Route path="student/*" element={<StudentModule />} />
            <Route path="staff/*" element={<StaffModule />} />
            <Route path="admin/*" element={<AdminModule />} />
          </Route>
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
