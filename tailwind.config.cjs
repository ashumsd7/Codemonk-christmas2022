/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/@rhythm-ui/react/lib/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /basis-(((.+)\/12)|full)/,
      variants: ["sm", "md", "lg", "xl"],
    },
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            p: {
              margin: 0,
              padding: 0,
            },
            img: {
              padding: 0,
              margin: 0,
            },
            h1: {
              fontSize: 36,
              lineHeight: "48px",
              margin: 0,
              fontWeight: 700,
              color: "#110F15",
            },
            h2: {
              fontSize: 24,
              lineHeight: "32px",
              margin: 0,
              fontWeight: 700,
              color: "#110F15",
            },
            h3: {
              fontSize: 18,
              lineHeight: "24px",
              margin: 0,
              color: "#110F15",
              fontWeight: 700,
            },
            '[class~="body-large"]': {
              fontSize: 18,
              lineHeight: "28px",
              fontWeight: 400,
              margin: 0,
              color: "#110F15",
            },
            '[class~="body"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 400,
              margin: 0,
            },
            '[class~="body-faded"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 400,
              margin: 0,
              color: "#110F15",
            },
            '[class~="body-faded-3"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 400,
              margin: 0,
              color: "#3C4858",
            },
            '[class~="body-faded-4"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 400,
              margin: 0,
              color: "#5A6679",
            },
            '[class~="body-small"]': {
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: 400,
              margin: 0,
            },

            '[class~="link-large"]': {
              fontSize: 18,
              lineHeight: "28px",
              fontWeight: 500,
            },
            '[class~="link"]': {
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 500,
              margin: 0,
            },
            '[class~="link-small"]': {
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
            },
            '[class~="link-small"]': {
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              margin: 0,
              textTransform: "uppercase",
            },
            '[class~="caps-small"]': {
              fontSize: 12,
              lineHeight: "20px",
              fontWeight: 500,
              margin: 0,
              textTransform: "uppercase",
            },
            '[class~="caps"]': {
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 700,
              margin: 0,
              textTransform: "uppercase",
            },
            '[class~="caps-chip"]': {
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 700,
              margin: 0,

              textTransform: "uppercase",
            },
            '[class~="caption"]': {
              fontSize: 12,
              lineHeight: "20px",
              fontWeight: 400,
              margin: 0,
            },
            button: {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 500,
              margin: 0,
            },
            '[class~="button"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 500,
              margin: 0,
            },
            '[class~="button-faded-3"]': {
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: 500,
              margin: 0,
              color: "#3C4858",
            },
          },
        },
      }),
      colors: {
        primary: {
          50: "#D5EDFF",
          100: "#ABD7F8",
          200: "#83BFED",
          300: "#67B1E9",
          400: "#469DDF",
          500: "#2488D3",
          600: "#0076CF",
          700: "#0069B8",
          800: "#015595",
          900: "#004071",
        },
        secondary: {
          50: "#F5F5F5",
          100: "#FBFBFD",
          200: "#F1F2F6",
          300: "#E5E9F2",
          400: "#C0CCDA",
          500: "#8391A7",
          600: "#5A6679",
          700: "#3C4858",
          800: "#1C2C40",
          900: "#110F15",
        },
        info: {
          ...colors.blue,
          50: "#FFF3D4",
          500: "#A46200",
        },
        success: colors.green,
        warning: {
          ...colors.blue,
          50: "#FFF3D4",
          500: "#A46200",
        },
        danger: {
          ...colors.red,
          500: "#BC1910",
          50: "#FFE2E0",
        },
        gray: colors.gray,
        dark: colors.neutral,
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      selectStyles: {
        background: colors.white,
        borderRadius: defaultTheme?.borderRadius.lg,
        padding: "2px 4px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
  ],
};
