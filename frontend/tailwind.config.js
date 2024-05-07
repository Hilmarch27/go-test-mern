import { content as _content, plugin } from "flowbite-react/tailwind";

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/lib/esm/**/*.js",
  _content(),
  ,
];
export const theme = {
  extend: {
    colors: {
      iceblue: "#61DBFB",
    },
  },
};
export const plugins = [plugin()];
