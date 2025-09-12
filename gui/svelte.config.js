import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    alias: {
      "@store": "src/store",
      "@components": "src/components",
      "@utils": "src/lib/utils",
      "@controllers": "src/controllers",
      "@modules": "src/modules",
      "@viewmodels": "src/viewmodels",
    },
    paths: {
      base: "",
      relative: true,
    },
    prerender: {
      entries: [],
    },
  },
};

export default config;
