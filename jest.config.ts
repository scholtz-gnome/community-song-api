export default {
  testEnvironment: "node",
  preset: "ts-jest",
  testRegex: "(/dist/tests/.*|(\\.|/)(test))\\.[t]s?$",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: __dirname + "/tests/coverage",
};
