module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
      'src/modules/**/*.{ts,tsx}', // Specify which files to collect coverage from
      '!src/**/*.d.ts', // Exclude type declaration files
    ],
    coverageDirectory: 'coverage', // Directory to output coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'], // Coverage reporters
  };