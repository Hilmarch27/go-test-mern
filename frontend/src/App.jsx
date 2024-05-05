import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./routes/Products/products";
// import Book from "./routes/Book/book";
// import SingleBook from "./routes/Book/singleBook";
// import CreateBook from "./routes/Book/createBook";
// import EditBook from "./routes/Book/editBook";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="/books" element={<Book />} /> */}
          {/* <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/editbook/:slug" element={<EditBook />} /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
