import { watch } from "chokidar";
import { exec } from "child_process";
import path from "path";

const buildCssCommand = "npm run build:css";

const watcher = watch(path.resolve('./src'), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  ignoreInitial: true,
  usePolling: true,
  interval: 1000,
  persistent: true,
});

let timeout = null;

const rebuild = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {

    console.log('Change detected. Rebuilding CSS...');

    exec(buildCssCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    });
  }, 200);
}

const ignorePath = (filePath) => {
  const conditions = [
    /Component\.php$/,
    /view\..*\.php$/,
    /style\..*\.css$/,
    /script\..*\.ts$/
  ];

  for(let pattern of conditions) {
    if(filePath.match(pattern)) {
      return false;
    }
  }

  return true;
}

watcher.on('all', (event, filePath) => {
  if(ignorePath(filePath)) {
    console.log(`Detected change on file ${filePath}. Skipping rebuild: not a Component file.`)
    return;
  }

  rebuild();
});

watcher.on('ready', () => {
  console.log('Initial scan complete. Watching for changes...');
});
