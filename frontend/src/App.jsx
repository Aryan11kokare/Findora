import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import AddItem from "./pages/AddItem";
import View from "./pages/View";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/viewItem/:id" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
