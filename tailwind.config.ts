import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'akaya': ['"Akaya Kanadaka"', 'cursive']
      },
      margin: {
        '1000px': '1000px',
        '268px': '268px',
        '500px': '500px',
        '244px': '244px',
        '586px': '586px'
      },
      height: {
        '456px': '456px',
        '323px': '323px'
      },
      width: {
        '739px': '739px',
        '649px': '649px'
      }
    },
  },
  plugins: [],
};
export default config;
