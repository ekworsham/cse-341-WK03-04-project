const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Plants API',
    description: 'Plants API'
  },
  host: 'localhhttps://cse-341-wk03-04-project.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);