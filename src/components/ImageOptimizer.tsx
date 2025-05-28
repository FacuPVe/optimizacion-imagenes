import { useState } from "react";

const ImageOptimizer = () => {
    // Estados para guardar la información
    const [imagenOriginal, setImagenOriginal] = useState<File | null>(null);
    const [imagenesOptimizadas, setImagenesOptimizadas] = useState<Array<{
        formato: string;
        url: string;
        tamaño: number;
    }>>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // Función para cuando se selecciona una imagen
    const manejarCambioImagen = async (evento: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = evento.target.files?.[0];
        if (archivo) {
            setError("");
            setImagenOriginal(archivo);
            await convertirImagenes(archivo);
        }
    };

    // Función para convertir las imágenes
    const convertirImagenes = async (archivo: File) => {
        try {
            setCargando(true);
            const formatos = ["image/webp", "image/avif"];
            const imagenesConvertidas = [];

            for (const formato of formatos) {
                try {
                    // Crear un canvas para la conversión
                    const lienzo = document.createElement('canvas');
                    const contexto = lienzo.getContext('2d');
                    const imagen = new Image();
                    
                    // Cargar la imagen
                    await new Promise((resolver, rechazar) => {
                        imagen.onload = resolver;
                        imagen.onerror = rechazar;
                        imagen.src = URL.createObjectURL(archivo);
                    });

                    // Dibujar la imagen en el canvas
                    lienzo.width = imagen.width;
                    lienzo.height = imagen.height;
                    contexto?.drawImage(imagen, 0, 0);

                    // Convertir a blob
                    const blob = await new Promise<Blob>((resolver) => {
                        lienzo.toBlob((blob) => {
                            if (blob) resolver(blob);
                        }, formato);
                    });

                    // Guardar la imagen convertida
                    imagenesConvertidas.push({
                        formato: formato,
                        url: URL.createObjectURL(blob),
                        tamaño: blob.size
                    });
                } catch (err) {
                    console.error("Error al convertir a " + formato + ":", err);
                }
            }

            setImagenesOptimizadas(imagenesConvertidas);
        } catch (err) {
            setError("Hubo un error al procesar la imagen. Intenta con otra imagen.");
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    // Función para mostrar el tamaño en formato legible
    const formatearTamaño = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const tamaños = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + tamaños[i];
    };

    return (
        <div className="flex flex-col items-center">
            <input 
                type="file" 
                accept="image/*"
                onChange={manejarCambioImagen} 
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            
            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            {cargando && (
                <div className="mb-4">
                    Procesando imagen...
                </div>
            )}

            {imagenOriginal && (
                <div className="w-full">
                    <h2 className="text-xl font-bold mt-4">Imagen Original</h2>
                    <img 
                        src={URL.createObjectURL(imagenOriginal)} 
                        alt="Original" 
                        className="w-60 mt-2" 
                    />
                    <p className="text-sm text-gray-600">
                        Tamaño: {formatearTamaño(imagenOriginal.size)}
                    </p>
                </div>
            )}

            {imagenesOptimizadas.length > 0 && (
                <div className="mt-6 w-full">
                    <h2 className="text-xl font-bold">Imágenes Optimizadas</h2>
                    <table className="mt-4 border-collapse border border-gray-300 w-full text-center">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Formato</th>
                                <th className="border border-gray-300 p-2">Imagen</th>
                                <th className="border border-gray-300 p-2">Tamaño</th>
                            </tr>
                        </thead>
                        <tbody>
                            {imagenesOptimizadas.map((img, index) => (
                                <tr key={index} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{img.formato}</td>
                                    <td className="border border-gray-300 p-2">
                                        <img src={img.url} alt={img.formato} className="w-60" />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {formatearTamaño(img.tamaño)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ImageOptimizer; 
