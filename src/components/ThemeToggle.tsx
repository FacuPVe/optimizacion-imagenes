import { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Al cargar la página o cambiar temas, es mejor añadir inline en `head` para evitar FOUC
        return localStorage.theme === "dark" || 
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    });

    // Efecto para aplicar el tema al cargar
    useEffect(() => {
        // Al cargar la página o cambiar temas, es mejor añadir inline en `head` para evitar FOUC
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            // Cuando el usuario elige explícitamente el modo claro
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        } else {
            // Cuando el usuario elige explícitamente el modo oscuro
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
        }
        setDarkMode(!darkMode);
    };

    return (
        <button
            className="fixed bottom-6 right-6 p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50 cursor-pointer"
            onClick={toggleTheme}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            <div className="flex items-center justify-center w-6 h-6 cursor-pointer">
                {darkMode ? (
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </div>
        </button>
    );
};

export default ThemeToggle; 
