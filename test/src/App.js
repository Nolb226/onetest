import "./App.css";
import "./css/reset.css";
import "./css/grid.css";
import "./css/base.css";
import "./fonts/fontawesome-free-6.1.2-web/css/all.min.css";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Container from "./components/container/container";

function App() {
  return (
    <div id="app" className="position-relative">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
