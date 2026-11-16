import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./constants/routes";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import Books from "./pages/Books";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.books} element={<Books />} />
        <Route path={ROUTES.bookDetails} element={<BookDetails />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
