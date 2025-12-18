import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // IMPORTANT: repo name because you're deploying to /MTA_Website/
  base: "/MTA_Website/",

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html"),
        team: resolve(__dirname, "team.html"),
        outsourcedAccounting: resolve(__dirname, "outsourced-accounting.html"),
        taxPlanning: resolve(__dirname, "tax-planning.html"),
        taxCompliance: resolve(__dirname, "tax-compliance.html"),
        payroll: resolve(__dirname, "payroll.html"),
        fractionalCfo: resolve(__dirname, "fractional-cfo.html"),
        businessSetupSuccession: resolve(__dirname, "business-setup-succession.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});