module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  coverageDirectory: 'coverage',
  collectCoverage: true, // Habilita a coleta de cobertura
  collectCoverageFrom: [
    'controllers/**/*.js', 
    'services/**/*.js', 
    'repositories/**/*.js',
    '!**/node_modules/**', // Ignora a pasta node_modules
  ],
  testMatch: ['**/?(*.)+(spec|test).js'],
};
