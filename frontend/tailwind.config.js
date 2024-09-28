/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                defaultbg: "#1d2024",
                specialblue: "#017cc5",
            },
            fontFamily: {
                gothic: ["Gothic A1", "sans-serif"],
                nunito: ["Nunito", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
