import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Admin />
      </BrowserRouter>
    </div>
  );
};

export default App;
