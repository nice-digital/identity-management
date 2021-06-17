module.exports = {
	parser: "babel-eslint",
	extends: [
		"@nice-digital/eslint-config/es6",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: { 
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/explicit-member-accessibility": "off"
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		es6: true,
	},
	overrides: [
		{
			files: ["setupTests.js", "**.test.js", "**.test.ts", "**.test.tsx"],
			env: {
				jest: true,
				browser: true,
			},
		},
	],
};
