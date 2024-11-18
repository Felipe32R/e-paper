import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: {
          primary: "#3A424E",
          secondary: "#6B7280",
        },
        green: {
          primary: {
            main: "#05C151",
            light: "#CAFFD6",
            lighter: "#EEFFF2",
            dark: "#079942",
          },
        },
        backgroundBlur: {
          neutral: "#191E29",
        },
        border: {
          neutral: "#E5E7EB",
          light: "#F9FAFB",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
