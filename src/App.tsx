import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import AddTask from "./components/AddTask";
import UserProvider from "./components/UserProvider";

import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";
import "./App.css";
//@ts-ignore
import { useGetUser } from "./hooks/useGetUser";

function App() {
  return (
    <>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/update-task/:taskId" element={<UpdateTask />} />
          </Routes>
        </Layout>
      </UserProvider>
    </>
  );
}

export default App;
