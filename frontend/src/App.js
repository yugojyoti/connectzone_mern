import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
