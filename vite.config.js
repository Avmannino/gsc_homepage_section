import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // This must match the GitHub repository name if you deploy
  // the project through GitHub Pages.
  base: "/gsc_homepage_section/",
});