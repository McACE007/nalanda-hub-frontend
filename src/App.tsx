import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/sonner";
import HomeLayout from "./layouts/HomeLayout";
import MyUploadsPage from "./pages/MyUploadsPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/my-uploads" element={<MyUploadsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
