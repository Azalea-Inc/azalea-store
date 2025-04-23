import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      "@store": "src/store",
      "@components": "src/components",
      "@utils": "src/lib/utils",
    },
    adapter: adapter(),
  },
};

export default config;
