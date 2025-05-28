import { Link } from "react-router-dom";

interface EjercicioCardProps {
    title: string;
    path: string;
    description: string;
}

const EjercicioCard = ({ title, path, description }: EjercicioCardProps) => {
    return (
        <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-300">{description}</p>
            <Link 
                to={path} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
                Ver Ejercicio
            </Link>
        </div>
    );
};

export default EjercicioCard; 
