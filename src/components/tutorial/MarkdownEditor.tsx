import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

const MarkdownEditor = () => {
    const [text, setText] = useState<string>(() => {
        return localStorage.getItem("tutorialContent") || "Escribe aquí tus notas...";
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
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <textarea
                className="w-full h-40 border p-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <h3 className="text-lg font-bold mt-4">Vista Previa</h3>
            <div className="p-4 border bg-gray-100">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <button
                onClick={exportToPDF}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
                Exportar a PDF
            </button>
        </div>
    );
};

export default MarkdownEditor;