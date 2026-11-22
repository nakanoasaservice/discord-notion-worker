import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: {
		entry: ["src/index.ts"],
		platform: "node",
		target: "node22",
		format: ["esm"],
		outDir: "dist",
		dts: false,
		outExtensions: () => ({ js: ".js" }),
	},
	fmt: {
		useTabs: true,
		printWidth: 80,
		ignorePatterns: ["dist/**", "pnpm-lock.yaml", ".examples/**", ".agents/**"],
	},
	lint: {
		ignorePatterns: ["dist/**", ".examples/**", ".agents/**"],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
});
