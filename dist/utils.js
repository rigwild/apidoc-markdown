"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/**
 * Recursively create an arborescence to the given path
 * @param p Path to follow
 */
exports.mkdirp = (p) => fs_1.promises.mkdir(p, { recursive: true });
/**
 * Make array values unique
 * @param arr Source array of strings
 */
exports.unique = (arr) => [...new Set(arr)];
/**
 * Check a path exists on the file system
 * @param p Path to check existance from
 * @throws Path does not exist
 */
exports.pathExists = (p) => fs_1.promises.access(p).then(() => true).catch(err => (console.log(err), false));
/**
 * Import apiDoc's project data
 * @param apiDocPath Path to the apiDoc output directory
 * @returns apiDoc project data
 * @throws Path does not exist
 * @throws Not a JSON-valid file
 */
exports.importApiDocData = async (apiDocPath) => ({
    projectData: await Promise.resolve().then(() => __importStar(require(path_1.default.resolve(apiDocPath, 'api_project.json')))),
    apiData: Object.values((await Promise.resolve().then(() => __importStar(require(path_1.default.resolve(apiDocPath, 'api_data.json')))))).filter((x) => x.type)
});
//# sourceMappingURL=utils.js.map