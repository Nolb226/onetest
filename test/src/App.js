import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./css/reset.css";
import "./css/grid.css";
import "./css/base.css";
import "./fonts/fontawesome-free-6.1.2-web/css/all.min.css";

import Home from "./components/pages/home";
import Dashboard from "./components/pages/dashboard";

function App() {
   return (
      <div id="app" className="position-relative">
         <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="*" element={<Home />}></Route>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dashboard/:type" element={<Dashboard />}></Route>
         </Routes>

         {/* <Home /> */}
      </div>
   );
}

export default App;
