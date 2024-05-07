import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./routes/Products/products";
import Pegawai from "./routes/Pegawai/pegawai";
import About from "./routes/About/about";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
