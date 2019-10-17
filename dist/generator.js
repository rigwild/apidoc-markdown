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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const ejs_1 = __importDefault(require("ejs"));
const semver_1 = __importDefault(require("semver"));
const utils = __importStar(require("./utils"));
const utilsTemplate = __importStar(require("./utils_template"));
/**
 * Load the apiDoc project
 * Will check some documentation generator parameters
 * @param param0 Generator parameters
 * @throws A parameter is not set or invalid
 */
const loadApiDocProject = async ({ apiDocPath, template, prepend }) => {
    // Check the apiDoc data path exists
    if (!apiDocPath)
        throw new Error('`apiDocPath` is required but was not provided.');
    if (!(await utils.pathExists(apiDocPath)))
        throw new Error('The `apiDocPath` path does not exist or is not readable.');
    // Check the template file path exists
    if (!template)
        throw new Error('`template` is required but was not provided.');
    if (!(await utils.pathExists(template)))
        throw new Error('The `template` path does not exist or is not readable.');
    // Check the prepend file path exists
    if (prepend && !(await utils.pathExists(prepend)))
        throw new Error('The `prepend` path does not exist or is not readable.');
    // Load the apiDoc data
    const { apiData, projectData } = await utils.importApiDocData(apiDocPath);
    // Import documentation template
    const ejsCompiler = ejs_1.default.compile((await fs_1.promises.readFile(template)).toString());
    return { apiData, projectData, ejsCompiler };
};
/**
 * Get the documentation compiler
 * @param param0 Documentation generator parameters
 * @returns The single and multi file compilers, ready for usage
 */
exports.getCompiler = async ({ apiDocPath, template, prepend }) => {
    const { apiData, projectData, ejsCompiler } = await loadApiDocProject({ apiDocPath, template, prepend });
    // Define template data
    let apiByGroupAndName;
    if (projectData.order) {
        // Group apiDoc data by group, name and with respect of order
        apiByGroupAndName = projectData.order
            .reduce((acc, cur) => {
            if (apiData.find(x => x.group === cur))
                acc.push({ name: cur, subs: [] });
            return acc;
        }, [])
            .map((g) => {
            projectData.order.forEach((x) => {
                let groupItem = apiData.find(y => y.group === g.name && y.name === x);
                if (groupItem)
                    g.subs.push(groupItem);
            });
            return g;
        });
    }
    else {
        // Group apiDoc data by group and name
        apiByGroupAndName = utils.unique(Object.values(apiData).map(x => x.group))
            .reduce((acc, cur) => {
            if (apiData.find(x => x.group === cur))
                acc.push({ name: cur, subs: [] });
            return acc;
        }, [])
            .map((g) => {
            apiData.forEach(x => x.group === g.name && g.subs.push(x));
            return g;
        })
            .map((g) => {
            g.subs = Object.values(g.subs.reduce((acc, cur) => {
                if (!acc[cur.title] || semver_1.default.gt(cur.version, acc[cur.title].version))
                    acc[cur.title] = cur;
                return acc;
            }, {}));
            return g;
        });
    }
    // This is the config passed to the template
    const templateConfig = {
        project: projectData,
        prepend: prepend ? (await fs_1.promises.readFile(prepend)).toString() : null,
        // Every functions in `utils_template.js` are passed to the EJS compiler
        ...utilsTemplate
    };
    return {
        singleCompiler: () => [{ name: 'main', content: ejsCompiler({ ...templateConfig, data: apiByGroupAndName }) }],
        multiCompiler: () => apiByGroupAndName.map(x => ({
            name: x.name,
            content: ejsCompiler({ ...templateConfig, data: [x] })
        }))
    };
};
/**
 * Generate mardown documentation. If single file, key `name` will be `main`
 * @param param0 Generator configuration
 * @returns Generated documentation
 */
exports.generateMarkdown = async ({ apiDocPath, template, prepend, multi }) => {
    const compilers = await exports.getCompiler({ apiDocPath, template, prepend });
    return !multi ? compilers.singleCompiler() : compilers.multiCompiler();
};
/**
 * Generate mardown documentation and create output files
 * @param param0 Generator configuration
 * @returns Generated documentation data
 */
exports.generateMarkdownFile = async ({ apiDocPath, output, template, prepend, multi, createPath }) => {
    // Recursively create directory arborescence if cli option is true
    if (createPath)
        await utils.mkdirp(output);
    // Check the output path exists (only parent directory if unique file)
    if (!output)
        throw new Error('`output` is required but was not provided.');
    const outputPath = multi ? output : path_1.default.parse(path_1.default.resolve('.', output)).dir;
    if (!(await utils.pathExists(outputPath)))
        throw new Error('The `output` path does not exist or is not readable.');
    const docs = await exports.generateMarkdown({ apiDocPath, template, prepend, multi });
    if (!multi) {
        // Single file documentation generation
        const singleDoc = docs[0].content;
        return fs_1.promises.writeFile(output, singleDoc)
            .then(() => ({ outputFile: output, content: singleDoc }));
    }
    else {
        // Multi file documentation generation
        return Promise.all(docs.map(aDoc => {
            const filePath = path_1.default.resolve(outputPath, `${aDoc.name}.md`);
            return fs_1.promises.writeFile(filePath, aDoc.content)
                .then(() => ({ outputFile: filePath, content: aDoc.content }));
        }));
    }
};
//# sourceMappingURL=generator.js.map