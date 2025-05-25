import ImageOptimizer from "./ImageOptimizer";

const Ejercicio01 = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Ejercicio 1:
                Optimización de Imágenes</h1>
            <p className="mb-4">
                Suba una imagen y conviértala a diferentes formatos. Luego, compare los tamaños de archivo.
            </p>
            <ImageOptimizer />
        </div>
    );
};
export default Ejercicio01; 
