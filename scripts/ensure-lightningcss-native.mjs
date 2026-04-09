import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const supportedPlatforms = new Set(["darwin"]);
const supportedArchitectures = new Set(["x64", "arm64"]);

function log(message) {
  process.stdout.write(`[lightningcss-native] ${message}\n`);
}

if (!supportedPlatforms.has(process.platform) || !supportedArchitectures.has(process.arch)) {
  log(`skip ${process.platform}/${process.arch}`);
  process.exit(0);
}

const packageName = `lightningcss-${process.platform}-${process.arch}`;
const binaryName = `lightningcss.${process.platform}-${process.arch}.node`;

let packageJsonPath;
let lightningcssRoot;

try {
  packageJsonPath = require.resolve(`${packageName}/package.json`);
} catch (error) {
  log(`skip missing package: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(0);
}

const pnpmRoot = path.resolve(process.cwd(), "node_modules/.pnpm");
const lightningcssEntry = fs
  .readdirSync(pnpmRoot, { withFileTypes: true })
  .find((entry) => entry.isDirectory() && entry.name.startsWith("lightningcss@"));

if (!lightningcssEntry) {
  log("skip missing lightningcss package root");
  process.exit(0);
}

lightningcssRoot = path.join(pnpmRoot, lightningcssEntry.name, "node_modules/lightningcss");

const packageRoot = path.dirname(packageJsonPath);
const sourceBinary = path.join(packageRoot, binaryName);
const targetBinary = path.join(lightningcssRoot, binaryName);

if (!fs.existsSync(sourceBinary)) {
  log(`skip missing source binary ${sourceBinary}`);
  process.exit(0);
}

try {
  if (fs.existsSync(targetBinary) || fs.lstatSync(targetBinary, { throwIfNoEntry: false })) {
    fs.rmSync(targetBinary, { force: true });
  }
} catch {
  fs.rmSync(targetBinary, { force: true });
}

fs.symlinkSync(sourceBinary, targetBinary);
log(`linked ${binaryName}`);
