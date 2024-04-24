module.exports = {
  singleQuote: false,
  jsxSingleQuote: true,
  bracketSpacing: true,
  printWidth: 120,
  semi: true,
  tabWidth: 2,
  trailingComma: "all",
  arrowParens: "avoid",
  endOfLine: "auto",
  overrides: [
    {
      files: "*.json",
      options: {
        singleQuote: false,
        parser: "json",
      },
    },
    {
      files: ["*.ts", "*tsx"],
      options: {
        parser: "typescript",
      },
    },
  ],
};
