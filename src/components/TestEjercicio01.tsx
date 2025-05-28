import { useState } from "react";

interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta: string;
    explicacion: string;
}

interface TestEjercicio01Props {
    onRespuestaSeleccionada?: (indice: number, opcion: string) => void;
    respuestasSeleccionadas?: string[];
    mostrarResultado?: boolean;
    esParteDeTestFinal?: boolean;
}

const preguntas: Pregunta[] = [
    {
        pregunta: "¿Cuál de estos formatos soporta transparencia?",
        opciones: ["JPEG", "PNG", "WebP", "AVIF"],
        respuesta: "PNG",
        explicacion: "PNG es uno de los formatos que mejor soporta transparencia."
    },
    {
        pregunta: "¿Qué formato es más eficiente en la web?",
        opciones: ["PNG", "JPEG", "WebP", "AVIF"],
        respuesta: "AVIF",
        explicacion: "AVIF es el formato más moderno y eficiente, ofreciendo mejor compresión que WebP y JPEG."
    },
    {
        pregunta: "¿Cuál de estos formatos es el más antiguo?",
        opciones: ["JPEG", "PNG", "WebP", "AVIF"],
        respuesta: "JPEG",
        explicacion: "JPEG es uno de los formatos más antiguos y ampliamente utilizados."
    },
    {
        pregunta: "¿Qué formato es mejor para fotografías?",
        opciones: ["PNG", "JPEG", "WebP", "AVIF"],
        respuesta: "JPEG",
        explicacion: "JPEG es ideal para fotografías por su compresión con pérdida que mantiene buena calidad visual."
    },
    {
        pregunta: "¿Cuál de estos formatos tiene mejor compresión sin pérdida?",
        opciones: ["JPEG", "PNG", "WebP", "AVIF"],
        respuesta: "PNG",
        explicacion: "PNG ofrece compresión sin pérdida, ideal para gráficos y texto."
    },
    {
        pregunta: "¿Qué formato fue desarrollado por Google?",
        opciones: ["PNG", "JPEG", "WebP", "AVIF"],
        respuesta: "WebP",
        explicacion: "WebP fue desarrollado por Google y es conocido por su excelente compresión y soporte para animaciones."
    },
    {
        pregunta: "¿Cuál de estos formatos soporta animaciones?",
        opciones: ["JPEG", "PNG", "WebP", "AVIF"],
        respuesta: "WebP",
        explicacion: "WebP es el formato que soporta animaciones y tiene una excelente compresión."
    },
    {
        pregunta: "¿Qué formato es mejor para gráficos con texto?",
        opciones: ["JPEG", "PNG", "WebP", "AVIF"],
        respuesta: "PNG",
        explicacion: "PNG es ideal para gráficos con texto debido a su excelente soporte para transparencia y compresión."
    },
    {
        pregunta: "¿Cuál de estos formatos tiene mejor soporte en navegadores antiguos?",
        opciones: ["PNG", "JPEG", "WebP", "AVIF"],
        respuesta: "JPEG",
        explicacion: "JPEG es compatible con una amplia gama de navegadores antiguos y tiene una excelente calidad visual."
    },
    {
        pregunta: "¿Qué formato fue desarrollado por el Alliance for Open Media?",
        opciones: ["PNG", "JPEG", "WebP", "AVIF"],
        respuesta: "AVIF",
        explicacion: "AVIF es el formato más moderno y eficiente desarrollado por el Alliance for Open Media."
    }
];

export { preguntas };

const TestEjercicio01 = ({ 
    onRespuestaSeleccionada, 
    respuestasSeleccionadas = Array(preguntas.length).fill(""),
    mostrarResultado = false,
    esParteDeTestFinal = false 
}: TestEjercicio01Props) => {
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
                <h2 className="text-2xl font-bold mb-4">Test de Conocimientos sobre Formatos de Imagen</h2>
            )}
            
            {!mostrarResultados ? (
                <>
                    {preguntas.map((pregunta, i) => (
                        <div key={i} className="mb-6 p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                            <p className="font-semibold mb-2 dark:text-white">{i + 1}. {pregunta.pregunta}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

export default TestEjercicio01; 