import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container py-4">
      <Outlet />
    </div>
  );
}

export default App;
