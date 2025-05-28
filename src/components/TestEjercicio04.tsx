import { useState } from "react";

interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta: string;
    explicacion: string;
}

interface TestEjercicio04Props {
    onRespuestaSeleccionada?: (indice: number, opcion: string) => void;
    respuestasSeleccionadas?: string[];
    mostrarResultado?: boolean;
    esParteDeTestFinal?: boolean;
}

const preguntas: Pregunta[] = [
    {
        pregunta: "¿Qué es Figma?",
        opciones: [
            "Una herramienta de diseño colaborativo en la nube",
            "Un editor de código",
            "Un gestor de bases de datos",
            "Un servidor web"
        ],
        respuesta: "Una herramienta de diseño colaborativo en la nube",
        explicacion: "Figma es una herramienta de diseño de interfaces que permite trabajar de forma colaborativa en la nube."
    },
    {
        pregunta: "¿Qué ventaja ofrece Figma sobre otros programas de diseño?",
        opciones: [
            "Trabajo colaborativo en tiempo real",
            "Mejor calidad de exportación",
            "Más herramientas de edición",
            "Mejor rendimiento"
        ],
        respuesta: "Trabajo colaborativo en tiempo real",
        explicacion: "Figma permite que múltiples usuarios trabajen simultáneamente en el mismo diseño, lo que facilita la colaboración."
    },
    {
        pregunta: "¿Qué son los componentes en Figma?",
        opciones: [
            "Elementos reutilizables que mantienen consistencia en el diseño",
            "Plugins para añadir funcionalidades",
            "Herramientas de edición",
            "Formatos de exportación"
        ],
        respuesta: "Elementos reutilizables que mantienen consistencia en el diseño",
        explicacion: "Los componentes en Figma son elementos que se pueden reutilizar y que mantienen la consistencia en todo el diseño."
    },
    {
        pregunta: "¿Qué es un estilo en Figma?",
        opciones: [
            "Propiedades reutilizables como colores, tipografías y efectos",
            "Un tipo de componente",
            "Una plantilla de diseño",
            "Un formato de exportación"
        ],
        respuesta: "Propiedades reutilizables como colores, tipografías y efectos",
        explicacion: "Los estilos en Figma permiten reutilizar propiedades como colores, tipografías y efectos para mantener la consistencia."
    },
    {
        pregunta: "¿Qué es el modo de prototipado en Figma?",
        opciones: [
            "Una funcionalidad para crear interacciones y animaciones",
            "Un modo de edición",
            "Un tipo de componente",
            "Un formato de exportación"
        ],
        respuesta: "Una funcionalidad para crear interacciones y animaciones",
        explicacion: "El modo de prototipado permite crear interacciones y animaciones para simular el comportamiento de la interfaz."
    }
];

export { preguntas };

const TestEjercicio04 = ({ 
    onRespuestaSeleccionada, 
    respuestasSeleccionadas = Array(preguntas.length).fill(""),
    mostrarResultado = false,
    esParteDeTestFinal = false 
}: TestEjercicio04Props) => {
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
                <h2 className="text-2xl font-bold mb-4">Test de Conocimientos sobre Figma</h2>
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

export default TestEjercicio04; 
