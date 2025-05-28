import React from "react";
import { Card, CardContent } from "./ui/card";

const FigmaComponent = () => {
    // Create data structure for the text positions
    const textPositions = [
        // Left column
        { top: "59px", left: "74px" },
        { top: "67px", left: "78px" },
        { top: "82px", left: "86px" },
        { top: "74px", left: "82px" },
        { top: "89px", left: "90px" },
        { top: "97px", left: "93px" },
        { top: "105px", left: "97px" },
        { top: "120px", left: "105px" },
        { top: "112px", left: "101px" },
        { top: "127px", left: "109px" },

        // Right column
        { top: "59px", left: "185px" },
        { top: "67px", left: "189px" },
        { top: "82px", left: "197px" },
        { top: "74px", left: "193px" },
        { top: "89px", left: "201px" },
        { top: "97px", left: "204px" },
        { top: "105px", left: "208px" },
        { top: "120px", left: "216px" },
        { top: "112px", left: "212px" },
        { top: "127px", left: "220px" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-[404px] h-[210px]">
                <Card className="relative w-[404px] h-[210px] bg-[url('/ejercicio04-images/rectangle-1.png')] bg-[100%_100%]">
                    <CardContent className="p-0">
                        {textPositions.map((position, index) => (
                            <div
                                key={index}
                                className="absolute [font-family:'Inter',Helvetica] font-extrabold text-black text-xs tracking-[0] leading-[normal]"
                                style={{ top: position.top, left: position.left }}
                            >
                                PRUEBA DE FIGMA
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Diseño Exportado de Figma gracias a Anima</h2>
                <p className="text-gray-600 mb-4">
                    Este componente fue diseñado en Figma y convertido en React.
                    Utiliza componentes reutilizables y estilos optimizados. <br /> <a href="https://www.figma.com/proto/xIiZqb0gPotJe9rWqVqewz/M9-Optimizaci%C3%B3n-de-Im%C3%A1genes?node-id=4-2&p=f&t=7JtKGLVmMIBG7Atz-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1" target="__blank">Clic aquí para ver prototipo...</a>
                </p>
                <button 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    onClick={() => alert('¡Botón interactivo funcionando!')}
                >
                    ¡Haz clic aquí!
                </button>
            </div>
        </div>
    );
};

export default FigmaComponent; 
