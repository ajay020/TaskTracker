import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import UserProvider from "./components/UserProvider";

import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";
import "./App.css";
//@ts-ignore
import { useGetUser } from "./hooks/useGetUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/app" element={<LandingPage />} />
              <Route
                path="/"
                element={
                  //@ts-ignore
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/update-task/:taskId"
                element={
                  //@ts-ignore
                  <ProtectedRoute>
                    <UpdateTask />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
