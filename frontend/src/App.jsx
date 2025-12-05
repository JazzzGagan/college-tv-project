import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import NewHome from "./pages/NewHome";
import CollegeEvents from "./pages/CollegeEvents";
import Staff from "./pages/Staff";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<NewHome />} />
        <Route path="/events" element={<CollegeEvents />} />
        <Route path="/staff" element={<Staff />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;
