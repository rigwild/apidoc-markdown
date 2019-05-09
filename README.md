# @rigwild/apidoc-markdown
[![npm badge](https://img.shields.io/npm/v/@rigwild/apidoc-markdown.svg?logo=npm)](https://www.npmjs.com/package/@rigwild/apidoc-markdown)

Generate API documentation in markdown from [apiDoc](https://github.com/apidoc/apidoc) data.

This is an up to date and maintained fork of [@martinj/node-apidoc-markdown](https://github.com/martinj/node-apidoc-markdown) (which is not maintained). The template was updated with recent apiDoc features thanks to [this fork](https://github.com/softdevstory/node-apidoc-markdown).


## Installation
```bash
yarn global add @rigwild/apidoc-markdown
# or
npm i -g @rigwild/apidoc-markdown
```
Then, generate your documentation using your newly added command *`apidoc-markdown`*.


## Usage
### Help message
```bash
Generate Markdown documentation from apiDoc data.
Usage: apidoc-markdown -p <path> -o <output_file> [-t <template_path>] [--multi] [--createPath] [--prepend <file_path>]

Options:
  --version       Show version number                                                                                                                [boolean]
  --path, -p      Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides.                         [string] [required]
  --output, -o    Output file or directory to write output to.                                                                             [string] [required]
  --template, -t  Path to EJS template file, if not specified default template will be used.                        [string] [default: "templates/default.md"]
  --prepend       Path to file content to add before route groups documentation.                                                                      [string]
  --multi         Output one file per group to the `output` directory.                                                              [boolean] [default: false]
  --createPath    Recursively create directory arborescence to the `output` directory.                                              [boolean] [default: false]
  -h, --help      Show help                                                                                                                          [boolean]

Examples:
  apidoc-markdown -p doc/ -o doc.md                         Generate from `doc/` apiDoc output to `./doc.md`
  apidoc-markdown -p doc -o multi-arg --multi --createPath  Generate from `doc/` apiDoc output to `./multi-arg/<group>.md`

@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown
```

### Command-line arguments
| Option      | Alias         | Description |
| ----------- | ------------- | ----------- |
| `--path <apiDoc_path>` | `-p` | Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides. |
| `--output <output_path>` | `-o` | Output file or directory to write output to |
| `--template <template_path>` | `-t` | Path to EJS template file, if not specified default template will be used. |
| `--prepend <file_path>` |  | Path to file content to add before route groups documentation |
| `--multi` |  | Output one file per group to the `output` directory |
| `--createPath` |  | Recursively create directory arborescence to the `output` directory |
| `--help` | `-h` | Show help message |


## Programmatic use
This project has been fully refactored to support programmatic use. Every functions are available in the *[./lib](./lib)* directory and exported.

The following [script](./examples/generateSingle.js) will generate the *[example.md](./examples/example.md)* file. 
```js
const apidocMarkdown = require('@rigwild/apidoc-markdown')
const r = require('path').resolve

const config = {
  path: r(__dirname), // Path to apiDoc data directory
  output: r(__dirname, 'example.md'), // Output path
  template: r(__dirname, '..', 'templates', 'default.md'), // Template path
  prepend: null, // File to preprend documentation with
  multi: false, // Should the documentation be generated one file per group
  createPath: false // Should the path to output path be recursively generated (mkdir -p)
}

apidocMarkdown.setup(config)
```


## Example
Generate documentation from the included example data. [View generated example](./examples/example.md)
```bash
apidoc-markdown -p examples -o examples/example.md
```

Generate documentation from the included example data, one file per group. [View generated example](./examples/multi-arg/)
```bash
apidoc-markdown -p examples -o examples/multi-arg --multi --createPath
```

## Todo
 - [x] Refactor project code
 - [x] Update and clean dependencies
 - [x] Refactor command-line tool
 - [x] Update Markdown default template to working EJS (Update breaking changes)
 - [x] Update default template for new apiDoc features. 
 - [x] CLI option : Export documentation to 1 file per group
 - [x] Programmatic use
 - [ ] Automated tests
 - [ ] Asynchronous code

 Don't hesitate to suggest any feature you would like by creating an [issue](https://github.com/rigwild/apidoc-markdown/issues) or a [pull request](https://github.com/rigwild/apidoc-markdown/pulls).

## License
[The MIT license](./LICENSE)
