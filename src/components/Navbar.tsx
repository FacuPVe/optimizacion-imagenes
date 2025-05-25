import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Optimización de Imágenes</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link className="hover:text-blue-200 transition-colors" to="/">Inicio</Link>
                    <Link className="hover:text-blue-200 transition-colors" to="/ejercicio01">Ejercicio 1</Link>
                    <Link className="hover:text-blue-200 transition-colors" to="/ejercicio02">Ejercicio 2</Link>
                    <Link className="hover:text-blue-200 transition-colors" to="/ejercicio03">Ejercicio 3</Link>
                    <Link className="hover:text-blue-200 transition-colors" to="/ejercicio04">Ejercicio 4</Link>
                    <Link className="hover:text-blue-200 transition-colors" to="/ejercicio05">Ejercicio 5</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
