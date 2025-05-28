import { useState } from "react";

interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta: string;
    explicacion: string;
}

interface TestEjercicio02Props {
    onRespuestaSeleccionada?: (indice: number, opcion: string) => void;
    respuestasSeleccionadas?: string[];
    mostrarResultado?: boolean;
    esParteDeTestFinal?: boolean;
}

const preguntas: Pregunta[] = [
    {
        pregunta: "¿Qué es el lazy loading?",
        opciones: [
            "Una técnica para cargar imágenes solo cuando son visibles en el viewport",
            "Un método para comprimir imágenes",
            "Una forma de optimizar el formato de las imágenes",
            "Un tipo de formato de imagen"
        ],
        respuesta: "Una técnica para cargar imágenes solo cuando son visibles en el viewport",
        explicacion: "El lazy loading es una técnica que retrasa la carga de imágenes hasta que el usuario se acerca a ellas en la página."
    },
    {
        pregunta: "¿Cuál es el atributo HTML que permite el lazy loading nativo?",
        opciones: ["loading", "lazy", "defer", "async"],
        respuesta: "loading",
        explicacion: "El atributo 'loading' con valor 'lazy' permite implementar lazy loading de forma nativa en HTML5."
    },
    {
        pregunta: "¿Qué ventaja tiene el lazy loading?",
        opciones: [
            "Mejora el tiempo de carga inicial de la página",
            "Aumenta la calidad de las imágenes",
            "Reduce el tamaño de las imágenes",
            "Mejora la compresión de las imágenes"
        ],
        respuesta: "Mejora el tiempo de carga inicial de la página",
        explicacion: "El lazy loading mejora el rendimiento inicial de la página al cargar solo las imágenes necesarias."
    },
    {
        pregunta: "¿Qué navegadores soportan lazy loading nativo?",
        opciones: [
            "Chrome, Firefox, Safari y Edge",
            "Solo Chrome",
            "Solo Firefox",
            "Ningún navegador lo soporta"
        ],
        respuesta: "Chrome, Firefox, Safari y Edge",
        explicacion: "Los principales navegadores modernos soportan lazy loading nativo a través del atributo loading."
    },
    {
        pregunta: "¿Cuál es la sintaxis correcta para implementar lazy loading?",
        opciones: [
            '<img src="imagen.jpg" loading="lazy" alt="descripción">',
            '<img src="imagen.jpg" lazy="true" alt="descripción">',
            '<img src="imagen.jpg" defer="true" alt="descripción">',
            '<img src="imagen.jpg" async="true" alt="descripción">'
        ],
        respuesta: '<img src="imagen.jpg" loading="lazy" alt="descripción">',
        explicacion: "La sintaxis correcta usa el atributo loading con el valor 'lazy'."
    }
];

export { preguntas };

const TestEjercicio02 = ({ 
    onRespuestaSeleccionada, 
    respuestasSeleccionadas = Array(preguntas.length).fill(""),
    mostrarResultado = false,
    esParteDeTestFinal = false 
}: TestEjercicio02Props) => {
    const [respuestasLocales, setRespuestasLocales] = useState<string[]>(respuestasSeleccionadas);
    const [mostrarResultadoLocal, setMostrarResultadoLocal] = useState(mostrarResultado);

    const seleccionarRespuesta = (indice: number, opcion: string) => {
        if (onRespuestaSeleccionada) {
            onRespuestaSeleccionada(indice, opcion);
        } else {
            const nuevasRespuestas = [...respuestasLocales];
            nuevasRespuestas[indice] = opcion;
            setRespuestasLocales(nuevasRespuestas);
        }
    };

    const comprobarRespuestas = () => {
        if (!esParteDeTestFinal) {
            setMostrarResultadoLocal(true);
        }
    };

    const respuestasActuales = onRespuestaSeleccionada ? respuestasSeleccionadas : respuestasLocales;
    const mostrarResultados = esParteDeTestFinal ? mostrarResultado : mostrarResultadoLocal;

    let respuestasCorrectas = 0;
    for (let i = 0; i < preguntas.length; i++) {
        if (respuestasActuales[i] === preguntas[i].respuesta) {
            respuestasCorrectas++;
        }
    }

    const puntuacion = Math.round((respuestasCorrectas / preguntas.length) * 100);

    return (
        <div className={esParteDeTestFinal ? "" : "p-6 max-w-2xl mx-auto"}>
            {!esParteDeTestFinal && (
                <h2 className="text-2xl font-bold mb-4">Test de Conocimientos sobre Lazy Loading</h2>
            )}
            
            {!mostrarResultados ? (
                <>
                    {preguntas.map((pregunta, i) => (
                        <div key={i} className="mb-6 p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                            <p className="font-semibold mb-2 dark:text-white">{i + 1}. {pregunta.pregunta}</p>
                            <div className="grid grid-cols-1 gap-2">
                                {pregunta.opciones.map((opcion) => (
                                    <button
                                        key={opcion}
                                        className={`p-3 text-left rounded-lg transition-colors ${
                                            respuestasActuales[i] === opcion
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                                        }`}
                                        onClick={() => seleccionarRespuesta(i, opcion)}
                                    >
                                        {opcion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {!esParteDeTestFinal && (
                        <button
                            onClick={comprobarRespuestas}
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Verificar respuestas
                        </button>
                    )}
                </>
            ) : (
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">
                        Tu puntuación: {puntuacion}%
                    </h3>
                    <p className="mb-4 dark:text-white">
                        Has respondido correctamente {respuestasCorrectas} de {preguntas.length} preguntas
                    </p>
                    {preguntas.map((pregunta, i) => (
                        <div key={i} className="mb-4 p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                            <p className="font-semibold dark:text-white">{pregunta.pregunta}</p>
                            <p className={`mt-2 ${
                                respuestasActuales[i] === pregunta.respuesta
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                            }`}>
                                Tu respuesta: {respuestasActuales[i]}
                            </p>
                            {respuestasActuales[i] !== pregunta.respuesta && (
                                <p className="text-green-600 dark:text-green-400">
                                    Respuesta correcta: {pregunta.respuesta}
                                </p>
                            )}
                            {pregunta.explicacion && (
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    {pregunta.explicacion}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestEjercicio02; 
