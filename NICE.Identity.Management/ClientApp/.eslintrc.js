module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		//"plugin:prettier/recommended",
		
	],
	plugins: [
		"react",
		"react-hooks",
		"@typescript-eslint",
		//"prettier",
	],
	settings: {
		react: {
			pragma: "React",
			version: "detect",
		},
	},
	rules: { 
		"@typescript-eslint/no-explicit-any": "off",
	},
	overrides: [
		{
			files: ["setupTests.js", "**.test.js", "**.test.ts", "**.test.tsx"],
			env: {
				jest: true,
				browser: true,
			},
		},
		{
			files: ["*.js"],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": "off",
			},
		},
	],	
};