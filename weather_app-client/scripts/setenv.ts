const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   BASE_API_URL: "${process.env.BASE_API_URL}",
   CITIES_API_KEY: "${process.env.CITIES_API_KEY}"
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: Error) {
  if (err) {
    console.log('ERROR IN SETENV FILE', err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
