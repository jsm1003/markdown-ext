module.exports = {
  // Include parentheses around a sole arrow function parameter
  arrowParens: 'avoid',

  // Controls the printing of spaces inside object literals
  bracketSpacing: true,

  // Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
  eslintIntegration: false,

  // Path to a .prettierignore or similar file
  ignorePath: '.prettierignore',

  // Fit code within this line limit
  printWidth: 80,

  // (Markdown) wrap prose over multiple lines
  proseWrap: 'preserve',

  // Require a 'prettierconfig' to format
  requireConfig: false,

  // Whether to add a semicolon at the end of every line
  semi: true,

  // If true, will use single instead of double quotes
  singleQuote: true,

  // Use 'prettier-stylelint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from stylelint rules.
  stylelintIntegration: false,

  // Number of spaces it should use per tab
  tabWidth: 2,

  // Controls the printing of trailing commas wherever possible.
  //  Valid options:
  //     'none' - No trailing commas
  //     'es5' - Trailing commas where valid in ES5 (objects, arrays, etc)
  //     'all' - Trailing commas wherever possible (function arguments)
  trailingComma: 'all',

  // Indent lines with tabs
  useTabs: false,
};
