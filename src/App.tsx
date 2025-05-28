import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

const Home = lazy(() => import("./components/Home"));
const Ejercicio01 = lazy(() => import("./components/Ejercicio01"));
const Ejercicio02 = lazy(() => import("./components/Ejercicio02"));
const Ejercicio03 = lazy(() => import("./components/Ejercicio03"));
const Ejercicio04 = lazy(() => import("./components/Ejercicio04"));
const Tutorial = lazy(() => import("./components/tutorial/Tutorial"));
// const Ejercicio05 = lazy(() => import("./components/Ejercicio05"));

function App() {
  useEffect(() => {
    console.log("App montado - Clases del documentElement:", document.documentElement.classList.toString());
    console.log("App montado - Clases del body:", document.body.classList.toString());
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 w-full container mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center py-4 text-xl">Cargando...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ejercicio01" element={<Ejercicio01 />} />
              <Route path="/ejercicio02" element={<Ejercicio02 />} />
              <Route path="/ejercicio03" element={<Ejercicio03 />} />
              <Route path="/ejercicio04" element={<Ejercicio04 />} />
              <Route path="/tutorial" element={<Tutorial />} />
              {/* <Route path="/ejercicio5" element={<Ejercicio05 />} /> */}
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </Router>
  );
}

export default App;