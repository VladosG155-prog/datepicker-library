/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        fontSize: {
            sm: '13px',
            base: '1rem',
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
        },
        extend: {
            colors: {
                gray: {
                    100: '#DDDDDD',
                    default: '#333333',
                    disabled: '#AAAAAA',
                },
                blue: {
                    50: '#2f80ed4d',
                    100: '#2f80ed99',
                    300: '#2F80ED',
                },
            },
        },
    },
    plugins: [],
    safelist: ['bg-blue', 'text-gray'],
}
