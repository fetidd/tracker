import withMT from "@material-tailwind/react/utils/withMT"
export default withMT({
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({nocompatible: true}),
  ],
})

