import path from "path";
import { globSync } from "glob";

const cssImportsNamespace = "css-imports-ns";
const jsImportNamespace = "js-imports-ns";

const cssImports = [
  "./src/**/*.css",
  "./vendor/cheerios/dumpsterfire-pages/src/**/*.css",
];

const tsImports = ["./src/**/*.ts"];

const importFiles = (files = []) => {
  return files
    .map((f) => `import "./${path.relative(process.cwd(), f)}";`)
    .join("\n");
};

const getLoaderObject = (loader, imports) => ({
  contents: imports,
  loader: loader,
  resolveDir: process.cwd(),
});

const getFileImportList = (paths = []) => {
  let res = [];
  paths.map((elem) => {
    res = [...res, ...globSync(elem)];
  });

  return importFiles(res);
};

const onResolve = (args, namespace) => ({
  path: args.path,
  namespace: namespace,
});

const cssOnResolve = (args) => onResolve(args, cssImportsNamespace);

const jsOnResolve = (args) => onResolve(args, jsImportNamespace);

const cssOnLoad = () => getLoaderObject("js", getFileImportList(cssImports));

const jsOnLoad = () => getLoaderObject("ts", getFileImportList(tsImports));

const dynamicImportsPlugin = () => ({
  name: "dynamic-imports",
  setup(build) {
    // CSS virtual module
    build.onResolve({ filter: /^virtual-css-imports$/ }, cssOnResolve);

    build.onLoad({ filter: /.*/, namespace: cssImportsNamespace }, cssOnLoad);

    // TS virtual module
    build.onResolve({ filter: /^virtual-js-imports$/ }, jsOnResolve);

    build.onLoad({ filter: /.*/, namespace: jsImportNamespace }, jsOnLoad);
  },
});

export default dynamicImportsPlugin;
