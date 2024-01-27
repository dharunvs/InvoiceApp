// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ["core-js", "regenerator-runtime"],
//   },
// });

import reactRefresh from "@vitejs/plugin-react";

export default {
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`, // Optional, if not using automatic React import
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
};
