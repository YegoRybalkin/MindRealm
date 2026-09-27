import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        gold: { DEFAULT: "hsl(var(--gold))", soft: "hsl(var(--gold-soft))" },
        mastery: {
          new: "hsl(var(--mastery-new))",
          learning: "hsl(var(--mastery-learning))",
          familiar: "hsl(var(--mastery-familiar))",
          mastered: "hsl(var(--mastery-mastered))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,16,10,0.04), 0 8px 24px -8px rgba(20,16,10,0.10)",
        lift: "0 2px 4px rgba(20,16,10,0.05), 0 18px 40px -12px rgba(20,16,10,0.22)",
      },
      keyframes: {
        "focus-pulse": {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.9)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85", transform: "scaleY(1)" },
          "30%": { opacity: "1", transform: "scaleY(1.06)" },
          "60%": { opacity: "0.75", transform: "scaleY(0.96)" },
        },
      },
      animation: {
        "focus-pulse": "focus-pulse 1.4s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        flicker: "flicker 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
