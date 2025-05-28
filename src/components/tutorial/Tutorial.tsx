import { useState } from 'react';
import EjercicioCard from './EjercicioCard';
import MarkdownEditor from './MarkdownEditor';
import Test from './Test';

const ejercicios = [
    { 
        id: 1, 
        title: "Optimización de Imágenes", 
        path: "/ejercicio01",
        description: "Aprende a optimizar imágenes para mejorar el rendimiento web"
    },
    { 
        id: 2, 
        title: "Lazy Loading", 
        path: "/ejercicio02",
        description: "Implementa carga diferida para mejorar la velocidad de carga"
    },
    { 
        id: 3, 
        title: "Manipulación con Canvas", 
        path: "/ejercicio03",
        description: "Manipula imágenes usando el elemento Canvas"
    },
    { 
        id: 4, 
        title: "Figma a React", 
        path: "/ejercicio04",
        description: "Convierte diseños de Figma a componentes React"
    },
];

const Tutorial = () => {
    const [activeTab, setActiveTab] = useState('ejercicios');

    return (
        <div className="p-6 max-w-6xl mx-auto dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Tutorial Interactivo de Optimización de Imágenes</h1>
            
            <div className="mb-6">
                <button 
                    onClick={() => setActiveTab('ejercicios')}
                    className={`mr-4 px-4 py-2 rounded transition-colors cursor-pointer ${
                        activeTab === 'ejercicios' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                    }`}
                >
                    Ejercicios
                </button>
                <button 
                    onClick={() => setActiveTab('notas')}
                    className={`mr-4 px-4 py-2 rounded transition-colors cursor-pointer ${
                        activeTab === 'notas' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                    }`}
                >
                    Mis Notas
                </button>
                <button 
                    onClick={() => setActiveTab('test')}
                    className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                        activeTab === 'test' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                    }`}
                >
                    Test Final
                </button>
            </div>

            {activeTab === 'ejercicios' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ejercicios.map((ejercicio) => (
                        <EjercicioCard 
                            key={ejercicio.id} 
                            title={ejercicio.title} 
                            path={ejercicio.path}
                            description={ejercicio.description}
                        />
                    ))}
                </div>
            )}

            {activeTab === 'notas' && (
                <div className="dark:text-white">
                    <h2 className="text-2xl font-bold mb-4">Mis Notas y Explicaciones</h2>
                    <MarkdownEditor />
                </div>
            )}

            {activeTab === 'test' && (
                <div className="dark:text-white">
                    <Test />
                </div>
            )}
        </div>
    );
};

export default Tutorial; 
