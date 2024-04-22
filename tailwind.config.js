/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        48: 'repeat(48, 1fr)',
      },
      fontFamily: {
        primary: 'var(--LemonRegular)',
        secondary: 'var(--LemonWide)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'typo',
    }),
  ],
};
