import { defineConfig } from "cypress";

export default defineConfig({
 
  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      
      require('cypress-mochawesome-reporter/plugin')(on);
      
    }
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
});
