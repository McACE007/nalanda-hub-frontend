import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/sonner";
import HomeLayout from "./layouts/HomeLayout";
import MyUploadsPage from "./pages/MyUploadsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyRequestsPage from "./pages/MyRequestsPage";
import AssignedRequestPage from "./pages/AssignedRequestsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/my-uploads" element={<MyUploadsPage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />
            <Route
              path="/assigned-requests"
              element={<AssignedRequestPage />}
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
