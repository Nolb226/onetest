
import './App.css';
import './css/reset.css';
import './css/grid.css';
import './css/base.css'
import './css/landing/style.css';
import './css/landing/responsive.css';
import './css/landing/modal.css';
import { useState } from 'react';
import { useEffect } from 'react';

import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';

function App() {

  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/classes/')
      .then((response) => response.json())
      .then((questions) => {
        console.log(questions.data.classes);
        setQuestion(questions.data.classes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, [])


  return (
    <div id="app" className="position-relative">
      <Header />
      <Footer />
    </div>
  )

}

export default App;
