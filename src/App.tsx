import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import AddTask from "./components/AddTask";
import AuthProvider from "./components/AuthProvider";

import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/add-task" element={<AddTask />}></Route>
            <Route path="/update-task/:taskId" element={<UpdateTask />}></Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
