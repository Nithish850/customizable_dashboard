import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Contact from "../components/pages/Contact";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
