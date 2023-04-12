// import ".././css/App.css";

import "../../css/reset.css";
import "../../css/grid.css";
import "../../css/base.css";
import "../../css/landing/responsive.css";

import Header from "../home/header/header";
import Footer from "../home/footer/footer";
import Container from "../home/container/container";

function Home() {
   return (
      <div id="Home" className="position-relative">
         <Header />
         <Container />
         <Footer />
      </div>
   );
}

export default Home;
