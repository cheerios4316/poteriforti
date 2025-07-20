import fs from "fs";
import { execSync } from "child_process";
import { globSync } from "glob";

const tailwindInput = "./tailwind/init.css";
const tailwindOutput = "./public/dist/tailwind.tmp.css";
const customCssFiles = globSync('./vendor/cheerios/dumpsterfire-pages/src/Components/**/*.css');

// Step 1: build tailwind
execSync(`npx tailwindcss -i ${tailwindInput} -o ${tailwindOutput}`, {
  stdio: "inherit",
});

// Step 2: concatenate tailwind + component CSS
const tailwindCss = fs.readFileSync(tailwindOutput);
const customCss = customCssFiles.map((f) => fs.readFileSync(f)).join("\n");
fs.writeFileSync("./public/dist/bundle.css", tailwindCss + "\n" + customCss);

// Step 3: cleanup
fs.unlinkSync(tailwindOutput);
