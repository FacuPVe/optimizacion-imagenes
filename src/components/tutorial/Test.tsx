import { useState, useEffect } from "react";
import TestEjercicio01, { preguntas as preguntasOptimizacion } from "../TestEjercicio01";
import TestEjercicio02, { preguntas as preguntasLazyLoading } from "../TestEjercicio02";
import TestEjercicio03, { preguntas as preguntasCanvas } from "../TestEjercicio03";
import TestEjercicio04, { preguntas as preguntasFigma } from "../TestEjercicio04";

interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuesta: string;
    explicacion: string;
    categoria: string;
}

interface PreguntasPorCategoria {
    optimizacion: Pregunta[];
    lazyLoading: Pregunta[];
    canvas: Pregunta[];
    figma: Pregunta[];
}

// Definimos las preguntas por categoría
const preguntasPorCategoria: PreguntasPorCategoria = {
    optimizacion: [
        {
            pregunta: "¿Cuál de estos formatos soporta transparencia?",
            opciones: ["JPEG", "PNG", "WebP", "AVIF"],
            respuesta: "PNG",
            explicacion: "PNG es uno de los formatos que mejor soporta transparencia.",
            categoria: "optimizacion"
        },
        {
            pregunta: "¿Qué formato es más eficiente en la web?",
            opciones: ["PNG", "JPEG", "WebP", "AVIF"],
            respuesta: "AVIF",
            explicacion: "AVIF es el formato más moderno y eficiente, ofreciendo mejor compresión que WebP y JPEG.",
            categoria: "optimizacion"
        }
    ],
    lazyLoading: [
        {
            pregunta: "¿Qué hace Lazy Loading?",
            opciones: [
                "Carga todas las imágenes de inmediato",
                "Carga imágenes solo cuando son visibles",
                "Reduce la calidad de las imágenes"
            ],
            respuesta: "Carga imágenes solo cuando son visibles",
            explicacion: "El lazy loading mejora el rendimiento cargando las imágenes solo cuando el usuario las necesita ver.",
            categoria: "lazyLoading"
        },
        {
            pregunta: "¿Qué API de JavaScript se usa para Lazy Loading?",
            opciones: ["Fetch API", "Intersection Observer", "Canvas API"],
            respuesta: "Intersection Observer",
            explicacion: "Intersection Observer es la API que permite detectar cuando un elemento entra en el viewport.",
            categoria: "lazyLoading"
        }
    ],
    canvas: [
        {
            pregunta: "¿Qué API de JavaScript permite manipular imágenes en un canvas?",
            opciones: ["WebGL", "Canvas API", "Intersection Observer"],
            respuesta: "Canvas API",
            explicacion: "La Canvas API permite manipular imágenes mediante JavaScript.",
            categoria: "canvas"
        },
        {
            pregunta: "¿Cuál de estos métodos obtiene los datos de píxeles de una imagen en Canvas?",
            opciones: ["getContext()", "getImageData()", "setTimeout()"],
            respuesta: "getImageData()",
            explicacion: "getImageData() permite obtener los datos de píxeles de una imagen en el canvas.",
            categoria: "canvas"
        }
    ],
    figma: [
        {
            pregunta: "¿Qué formato es ideal para exportar iconos desde Figma?",
            opciones: ["JPEG", "PNG", "SVG"],
            respuesta: "SVG",
            explicacion: "SVG es el formato ideal para iconos por su escalabilidad y calidad.",
            categoria: "figma"
        },
        {
            pregunta: "¿Qué plugin permite exportar código JSX desde Figma?",
            opciones: ["Tailwind CSS for Figma", "Anima for Figma", "SVG Export"],
            respuesta: "Anima for Figma",
            explicacion: "Anima for Figma permite convertir diseños en código JSX.",
            categoria: "figma"
        }
    ]
};

interface RespuestasPorTest {
    [key: string]: string[];
}

const Test = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [preguntasMezcladas, setPreguntasMezcladas] = useState<Pregunta[]>([]);
    const [respuestas, setRespuestas] = useState<RespuestasPorTest>({
        optimizacion: [],
        lazyLoading: [],
        canvas: [],
        figma: [],
        todas: []
    });

    // Función para mezclar preguntas
    const mezclarPreguntas = (preguntas: Pregunta[]) => {
        const copia = [...preguntas];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        return copia;
    };

    // Cuando cambia la categoría seleccionada, mezclamos las preguntas
    useEffect(() => {
        if (categoriaSeleccionada === "todas") {
            // Combinamos preguntas de todos los tests
            const todasLasPreguntas: Pregunta[] = [
                ...preguntasOptimizacion.map(p => ({ ...p, categoria: "optimizacion" })),
                ...preguntasLazyLoading.map(p => ({ ...p, categoria: "lazyLoading" })),
                ...preguntasCanvas.map(p => ({ ...p, categoria: "canvas" })),
                ...preguntasFigma.map(p => ({ ...p, categoria: "figma" }))
            ];
            setPreguntasMezcladas(mezclarPreguntas(todasLasPreguntas));
            setRespuestas(prev => ({
                ...prev,
                todas: new Array(todasLasPreguntas.length).fill("")
            }));
        }
    }, [categoriaSeleccionada]);

    const handleRespuestaSeleccionada = (categoria: string, indice: number, opcion: string) => {
        setRespuestas(prev => {
            const nuevasRespuestas = { ...prev };
            if (!nuevasRespuestas[categoria]) {
                nuevasRespuestas[categoria] = [];
            }
            nuevasRespuestas[categoria][indice] = opcion;
            return nuevasRespuestas;
        });
    };

    const comprobarRespuestas = () => {
        setMostrarResultado(true);
    };

    const reiniciarTest = () => {
        setCategoriaSeleccionada("");
        setMostrarResultado(false);
        setRespuestas({
            optimizacion: [],
            lazyLoading: [],
            canvas: [],
            figma: [],
            todas: []
        });
    };

    // Componente para mostrar preguntas mezcladas
    const TestTodasCategorias = () => {
        const respuestasActuales = respuestas.todas;
        let respuestasCorrectas = 0;

        for (let i = 0; i < preguntasMezcladas.length; i++) {
            if (respuestasActuales[i] === preguntasMezcladas[i].respuesta) {
                respuestasCorrectas++;
            }
        }

        const puntuacion = Math.round((respuestasCorrectas / preguntasMezcladas.length) * 100);

        return (
            <div>
                {!mostrarResultado ? (
                    <>
                        {preguntasMezcladas.map((pregunta, i) => (
                            <div key={i} className="mb-6 p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold dark:text-white">{i + 1}. {pregunta.pregunta}</p>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {pregunta.categoria}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {pregunta.opciones.map((opcion) => (
                                        <button
                                            key={opcion}
                                            className={`p-3 text-left rounded-lg transition-colors ${
                                                respuestasActuales[i] === opcion
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                                            }`}
                                            onClick={() => handleRespuestaSeleccionada("todas", i, opcion)}
                                        >
                                            {opcion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4 dark:text-white">
                            Tu puntuación: {puntuacion}%
                        </h3>
                        <p className="mb-4 dark:text-white">
                            Has respondido correctamente {respuestasCorrectas} de {preguntasMezcladas.length} preguntas
                        </p>
                        {preguntasMezcladas.map((pregunta, i) => (
                            <div key={i} className="mb-4 p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold dark:text-white">{pregunta.pregunta}</p>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {pregunta.categoria}
                                    </span>
                                </div>
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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Test Final</h2>
            
            {!mostrarResultado ? (
                <>
                    <div className="mb-6">
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Selecciona una categoría:
                        </label>
                        <select
                            id="categoria"
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="todas">Todas las categorías</option>
                            <option value="optimizacion">Optimización de Imágenes</option>
                            <option value="lazyLoading">Lazy Loading</option>
                            <option value="canvas">Canvas</option>
                            <option value="figma">Figma</option>
                        </select>
                    </div>

                    {categoriaSeleccionada === "todas" && <TestTodasCategorias />}

                    {categoriaSeleccionada === "optimizacion" && (
                        <TestEjercicio01
                            onRespuestaSeleccionada={(indice, opcion) => handleRespuestaSeleccionada("optimizacion", indice, opcion)}
                            respuestasSeleccionadas={respuestas.optimizacion}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "lazyLoading" && (
                        <TestEjercicio02
                            onRespuestaSeleccionada={(indice, opcion) => handleRespuestaSeleccionada("lazyLoading", indice, opcion)}
                            respuestasSeleccionadas={respuestas.lazyLoading}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "canvas" && (
                        <TestEjercicio03
                            onRespuestaSeleccionada={(indice, opcion) => handleRespuestaSeleccionada("canvas", indice, opcion)}
                            respuestasSeleccionadas={respuestas.canvas}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "figma" && (
                        <TestEjercicio04
                            onRespuestaSeleccionada={(indice, opcion) => handleRespuestaSeleccionada("figma", indice, opcion)}
                            respuestasSeleccionadas={respuestas.figma}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada && (
                        <button
                            onClick={comprobarRespuestas}
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors mt-6"
                        >
                            Verificar respuestas
                        </button>
                    )}
                </>
            ) : (
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">
                        Resultados del Test
                    </h3>
                    
                    {categoriaSeleccionada === "todas" && <TestTodasCategorias />}

                    {categoriaSeleccionada === "optimizacion" && (
                        <TestEjercicio01
                            respuestasSeleccionadas={respuestas.optimizacion}
                            mostrarResultado={true}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "lazyLoading" && (
                        <TestEjercicio02
                            respuestasSeleccionadas={respuestas.lazyLoading}
                            mostrarResultado={true}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "canvas" && (
                        <TestEjercicio03
                            respuestasSeleccionadas={respuestas.canvas}
                            mostrarResultado={true}
                            esParteDeTestFinal={true}
                        />
                    )}

                    {categoriaSeleccionada === "figma" && (
                        <TestEjercicio04
                            respuestasSeleccionadas={respuestas.figma}
                            mostrarResultado={true}
                            esParteDeTestFinal={true}
                        />
                    )}

                    <button
                        onClick={reiniciarTest}
                        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Intentar otra categoría
                    </button>
                </div>
            )}
        </div>
    );
};

export default Test; 
