import { theme } from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Open Sans", ...theme.fontFamily.sans],
			},
			fontSize: {
				xs: [
					"10px",
					{
						lineHeight: "14px",
					},
				],
				sm: [
					"12px",
					{
						lineHeight: "16px",
						fontWeight: "500",
					},
				],
				md: [
					"14px",
					{
						lineHeight: "18px",
						fontWeight: "600",
					},
				],
				lg: [
					"18px",
					{
						lineHeight: "24px",
						fontWeight: "700",
					},
				],
				xl: [
					"24px",
					{
						lineHeight: "32px",
						fontWeight: "700",
					},
				],
			},
			colors: {
				"blue-base": "#2C46B1",
				"blue-dark": "#2C4091",
				"grayscale-100": "#F9F9FB",
				"grayscale-200": "#E4E6EC",
				"grayscale-300": "#CDCFD5",
				"grayscale-400": "#74798B",
				"grayscale-500": "#4D505C",
				"grayscale-600": "#1F2025",
				danger: "#B12C4D",
			},
			width: {
				"40p": "40%",
			},
		},
	},
	plugins: [],
};
