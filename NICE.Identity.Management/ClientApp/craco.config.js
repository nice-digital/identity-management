// CRA 5 doesn't treat .cjs files as JavaScript, so its catch-all asset rule emits them as static
// files and `require` returns a URL instead of the module. Global nav v7's dependencies
// (@mantine/hooks, @headlessui/react) use .cjs entry points, so compile .cjs like other
// node_modules JS.
module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			const { oneOf } = webpackConfig.module.rules.find((rule) => rule.oneOf);

			const nodeModulesJsRule = oneOf.find(
				(rule) =>
					rule.test &&
					rule.test.toString() === /\.(js|mjs)$/.toString() &&
					rule.loader &&
					rule.loader.includes("babel-loader")
			);

			if (!nodeModulesJsRule)
				throw new Error("craco.config.js: couldn't find CRA's node_modules babel rule");

			nodeModulesJsRule.test = /\.(js|mjs|cjs)$/;

			return webpackConfig;
		},
	},
};
