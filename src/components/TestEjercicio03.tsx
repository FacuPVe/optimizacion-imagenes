import { useState } from "react";

interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta: string;
    explicacion: string;
}

interface TestEjercicio03Props {
    onRespuestaSeleccionada?: (indice: number, opcion: string) => void;
    respuestasSeleccionadas?: string[];
    mostrarResultado?: boolean;
    esParteDeTestFinal?: boolean;
}

const preguntas: Pregunta[] = [
    {
        pregunta: "¿Qué es el Canvas en HTML5?",
        opciones: [
            "Un elemento que permite dibujar gráficos usando JavaScript",
            "Un elemento para mostrar imágenes",
            "Un elemento para crear animaciones CSS",
            "Un elemento para mostrar videos"
        ],
        respuesta: "Un elemento que permite dibujar gráficos usando JavaScript",
        explicacion: "El Canvas es un elemento HTML5 que proporciona un área de dibujo donde se pueden renderizar gráficos usando JavaScript."
    },
    {
        pregunta: "¿Qué método se usa para dibujar un rectángulo en Canvas?",
        opciones: ["fillRect()", "drawRect()", "createRect()", "makeRect()"],
        respuesta: "fillRect()",
        explicacion: "El método fillRect() se usa para dibujar un rectángulo relleno en el Canvas."
    },
    {
        pregunta: "¿Cómo se obtiene el contexto 2D del Canvas?",
        opciones: [
            "getContext('2d')",
            "getCanvas('2d')",
            "createContext('2d')",
            "initContext('2d')"
        ],
        respuesta: "getContext('2d')",
        explicacion: "El método getContext('2d') se usa para obtener el contexto de renderizado 2D del Canvas."
    },
    {
        pregunta: "¿Qué método se usa para dibujar un círculo en Canvas?",
        opciones: ["arc()", "circle()", "drawCircle()", "makeCircle()"],
        respuesta: "arc()",
        explicacion: "El método arc() se usa para dibujar un arco o círculo en el Canvas."
    },
    {
        pregunta: "¿Qué propiedad se usa para establecer el color de relleno en Canvas?",
        opciones: ["fillStyle", "color", "backgroundColor", "fillColor"],
        respuesta: "fillStyle",
        explicacion: "La propiedad fillStyle se usa para establecer el color, gradiente o patrón que se usará para rellenar formas en el Canvas."
    }
];

export { preguntas };

const TestEjercicio03 = ({ 
    onRespuestaSeleccionada, 
    respuestasSeleccionadas = Array(preguntas.length).fill(""),
    mostrarResultado = false,
    esParteDeTestFinal = false 
}: TestEjercicio03Props) => {
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
                <h2 className="text-2xl font-bold mb-4">Test de Conocimientos sobre Canvas</h2>
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

export default TestEjercicio03;
