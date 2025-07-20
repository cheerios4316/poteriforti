import path from "path";
import { globSync } from "glob";

const importFiles = (files = []) => {
  return files
    .map((f) => `import "./${path.relative(process.cwd(), f)}";`)
    .join("\n");
};

const getLoaderObject = (loader, imports) => ({
  contents: imports,
  loader: loader,
  resolveDir: process.cwd()
});

const cssImportsNamespace = "css-imports-ns";
const jsImportNamespace = "js-imports-ns";

const getFileImportList = (paths = []) => {
  let res = [];
  paths.map(elem => {
    res = [
      ...res,
      ...globSync(elem)
    ]
  })

  return importFiles(res);
}

export default function dynamicImportsPlugin() {
  return {
    name: "dynamic-imports",
    setup(build) {
      // CSS virtual module
      build.onResolve({ filter: /^virtual-css-imports$/ }, (args) => {
        return { path: args.path, namespace: cssImportsNamespace };
      });

      build.onLoad({ filter: /.*/, namespace: cssImportsNamespace }, () => {
        
        const imports = getFileImportList([
          "./src/**/*.css",
          "./vendor/cheerios/dumpsterfire-pages/src/**/*.css"
        ])

        return getLoaderObject("js", imports);
      });

      // TS virtual module
      build.onResolve({ filter: /^virtual-js-imports$/ }, (args) => {
        return { path: args.path, namespace: jsImportNamespace };
      });

      build.onLoad({ filter: /.*/, namespace: jsImportNamespace }, () => {
        const imports = getFileImportList(["./src/**/*.ts"]);

        return getLoaderObject("ts", imports);
      });
    },
  };
}
