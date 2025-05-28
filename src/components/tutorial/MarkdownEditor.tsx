import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

const MarkdownEditor = () => {
    const [text, setText] = useState<string>(() => {
        return localStorage.getItem("tutorialContent") || "# Mis Notas\n\nEscribe aquí tus notas y explicaciones sobre los ejercicios...";
    });

    useEffect(() => {
        localStorage.setItem("tutorialContent", text);
    }, [text]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(text, 10, 10);
        doc.save("Tutorial_Notas.pdf");
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setText((prev) => prev + `\n\n![Imagen subida](${reader.result})`);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-2">Editor</h3>
                    <textarea
                        className="w-full h-[500px] border p-4 rounded-lg font-mono cursor-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe tus notas en formato Markdown..."
                    />
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2">Vista Previa</h3>
                    <div className="w-full h-[500px] border p-4 rounded-lg bg-gray-50 overflow-auto dark:bg-gray-700">
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <p>Consejos:</p>
                <ul className="list-disc list-inside">
                    <li>Usa # para títulos</li>
                    <li>Usa * o - para listas</li>
                    <li>Usa **texto** para negrita</li>
                    <li>Usa *texto* para cursiva</li>
                </ul>
            </div>
            <button
                onClick={exportToPDF}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                Exportar a PDF
            </button>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-4 mb-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                file:cursor-pointer
                hover:file:bg-blue-100"
            />
        </div>
    );
};

export default MarkdownEditor;