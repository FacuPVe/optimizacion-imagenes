import EjercicioCard from "./EjercicioCard";
import MarkdownEditor from "./MarkdownEditor";

const ejercicios = [
    { id: 1, title: "Optimización de Imágenes", path: "/ejercicio1" },
    { id: 2, title: "Lazy Loading", path: "/ejercicio2" },
    { id: 3, title: "Manipulación con Canvas", path: "/ejercicio3" },
    { id: 4, title: "Figma a React", path: "/ejercicio4" },
];
const Tutorial = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Tutorial
                Interactivo</h1>
            <p className="mb-4">
                Aquí puedes documentar y presentar los ejercicios realizados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ejercicios.map((ejercicio) => (
                    <EjercicioCard key={ejercicio.id} title={ejercicio.title} path={ejercicio.path} />
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-6">Notas del Estudiante</h2>
            <MarkdownEditor />
        </div>
    );
};
export default Tutorial; 
