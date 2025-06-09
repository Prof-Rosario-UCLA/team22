import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Addding the Vite PWA plugin
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "HobbyQuest",
        short_name: "HobbyQuest",
        description: "An application to track and discover new hobbies.",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "logo-org-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-org-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo-org-512.png", // Maskable icon
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});

// Tailwind dark mode and design system are handled in tailwind.css and tailwind.config.js
