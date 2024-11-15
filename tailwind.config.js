/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-blue": "#002561",
        "main-red": "#ed1c23",
        "kia-red": "#EA0029",
        "kia-black": "#06141F",
        "samsung-blue": "#074CA1",
        "samsung-gray": "#C0C0C0",
        "lg-red": "#a50034",
        "doosan-navy": "#131230",
        "doosan-red": "#ED1C24",
        "ssg-red": "#ce0e2d",
        "ssg-yellow": "#ffb81c",
        "lotte-red": "#D00F31",
        "lotte-blue": "#041E42",
        "hanwha-orange": "#FF6600",
        "hanwha-black": "#020F17",
        "nc-dip-blue": "#071d3d",
        "nc-blue": "#1d477d",
        "nc-gold": "#c7a079",
        "kiwoom-burgundy": "#660016",
      },
      backgroundImage: {
        "ball-park": "url(/ballpark.png)",
      },
      fontFamily: {
        kbo: "KBO-Dia-Gothic_bold",
        s_core: "S-CoreDream-3Light",
        paper_logy: "Paperlogy-8ExtraBold",
      },
    },
  },
  plugins: [],
};
