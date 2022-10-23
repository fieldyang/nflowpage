import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import path from "path";
import ts from "rollup-plugin-typescript2";
// import {
// 	terser
// } from "rollup-plugin-terser";
const commonOpt = {
		name: 'NodomUi',
		sourcemap: true
	}/*,
	pluginOpt = {
		...commonOpt,
		plugins: [terser({
			keep_classnames: true,
		})],
	};*/

export default {
	input: path.join(__dirname, "/index.ts"),
	output: [{
			file: resolve('npageflow.js'),
			format: "esm",
			...commonOpt
		},
		// {
		// 	file: resolve('test1.js'),
		// 	format: "iife",
		// 	...commonOpt
		// }
	
	],
	// external:['nodom3'],
	plugins: [
		nodeResolve({
			extensions: [".js", ".ts"],
		}),
		ts(),
		commonjs(),
	],
};

function resolve(name) {
	return path.resolve(`dist/${name}`);
}