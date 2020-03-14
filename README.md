# @rigwild/apidoc-markdown
[![npm badge](https://img.shields.io/npm/v/@rigwild/apidoc-markdown.svg?logo=npm)](https://www.npmjs.com/package/@rigwild/apidoc-markdown)

Generate API documentation in markdown from [apiDoc](https://github.com/apidoc/apidoc) data.

This is an up to date and maintained fork of [@martinj/node-apidoc-markdown](https://github.com/martinj/node-apidoc-markdown) (which is not maintained). The template was updated with recent apiDoc features thanks to [this fork](https://github.com/softdevstory/node-apidoc-markdown).

The documentation template has been updated. The project was fully rewrote to TypeScript and programmatic usage. Tests were added.

## Installation
```bash
# For the command line utility
yarn global add @rigwild/apidoc-markdown # or npm i -g @rigwild/apidoc-markdown

# For programmatic usage
yarn add @rigwild/apidoc-markdown # or npm i @rigwild/apidoc-markdown
```
Then, generate your documentation using your newly added command *`apidoc-markdown`* or [programmatically](#programmatic-usage-API).

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
  apidoc-markdown -p doc -o multi/ --multi --createPath     Generate from `doc/` apiDoc output to `./multi/<group>.md`

@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown
```

### Command-line arguments
| Option      | Alias         | Description |
| ----------- | ------------- | ----------- |
| `--help` | `-h` | Show help message |
| `--apiDocPath <apiDoc_path>` | `-p` | Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides. |
| `--output <output_path>` | `-o` | Output file or directory to write output to. |
| `--template <template_path>` | `-t` | Path to an EJS template file. If not specified, the [default template](./templates/default.md) is used (see [Examples](#example)). |
| `--prepend <file_path>` |  | Path to file content to add before route groups documentation. |
| `--multi` |  | Output one file per group to the `--output` directory. |
| `--createPath` |  | Recursively create directory arborescence to the `--output` directory |

## Programmatic usage API
#### generateMarkdown
Generate mardown documentation.

```ts
generateMarkdown: (config: ConfigurationObject) => Promise<{ name: string, content: string }[]>
```

See [`./src/types`](./src/types.ts).
```ts
export declare interface ConfigurationObject {
  /** apiDoc project JSON data object (`api_project.json` (or legacy `apidoc.json`) file content) */
  apiDocProjectData: { [key: string]: any }

  /** apiDoc documentation JSON data object (`api_data.json` file content) */
  apiDocApiData: { [key: string]: any }[]

  /** EJS template (will use default if ommitted, see './templates/default.md'). */
  template?: string

  /** Content to add before route groups documentation */
  prepend?: string

  /** Generate one documentation output per group */
  multi?: boolean
}
```

Usage example:
```ts
import { generateMarkdown } from '@rigwild/apidoc-markdown'

const documentation = await generateMarkdown({
  apiDocProjectData: { name: 'test', version: '0.13.0', /* ... */ },
  apiDocApiData: [{ type: 'get', url: '/define', /* ... */ }],
  template: 'my EJS template <%= project.name %> v<%= project.version %>',
  prepend: 'Prepend this!',
  multi: false
})
```

#### generateMarkdownFileSystem
Generate mardown documentation and create output file(s).

```ts
generateMarkdownFileSystem: (config: ConfigurationObjectCLI) => Promise<{ name: string, content: string }[]>
```

See [`./src/types`](./src/types.ts).
```ts
export declare interface ConfigurationObjectCLI {
  /** Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` are located */
  apiDocPath: string

  /** Output file or directory to write output to */
  output: string

  /** Path to EJS template file './templates/default.md' */
  template: string

  /** Path to file content to add before route groups documentation */
  prepend?: string

  /** Output one file per group to the `output` directory */
  multi?: boolean

  /** Recursively create directory arborescence to the `output` directory */
  createPath?: boolean
}
```

Usage example (see [`./examples/basic/generate.ts`](./examples/basic/generate.ts)):
```ts
import path from 'path'
import { generateMarkdownFileSystem } from '@rigwild/apidoc-markdown'

const documentation = await generateMarkdownFileSystem({
  apiDocPath: path.resolve(__dirname, 'path', 'to', 'apiDoc', 'output', 'files', 'directory'),
  output: path.resolve(__dirname, 'output'),
  template: path.resolve(__dirname, '..', '..', 'templates', 'default.md'),
  prepend: 'Prepend this!',
  multi: true,
  createPath: true
})
```

## Configuration
### Endpoints order
You can choose the order in which the documentation endpoints will be generated by adding an `order` key in `api_project.js`. [See example](./examples/_apiDocData/out/api_project.json#L15-L22).

## Example
The official [apiDoc project sample](https://github.com/apidoc/apidoc-example) is used to demonstrate the full capabilities of this package.

To generate the apiDoc project files, run the following using [apiDoc](https://github.com/apidoc/apidoc).

This will generate the full apiDoc documentation including the [`api_data.json`](./examples/_apiDocData/out/api_data.json) and [`api_project.json`](./examples/_apiDocData/out/api_project.json) files (which are the only files needed for the Markdown conversion).

```bash
# Generate apiDoc data
cd ./examples/_apiDocData/
apidoc -i ./src -o ./out

# Keep only required files
mv out/api_project.json out/api_data.json -t .
rm -rf ./out/*
mv api_project.json api_data.json -t ./out
```

### Basic example
Generate documentation from the included example data (See [`./examples/basic/example.md`](./examples/basic/example.md)).

```bash
apidoc-markdown -p ./examples/basic -o ./examples/basic/example.md
```

### Multi-files example
Generate documentation from the included example data, one file per group (See [`./examples/multi/output/`](./examples/multi/output/)).

```bash
apidoc-markdown -p ./examples/multi -o ./examples/multi/output --multi --createPath
```

## Contribute
Suggest any feature you would like by creating an [issue](https://github.com/rigwild/apidoc-markdown/issues) or a [pull request](https://github.com/rigwild/apidoc-markdown/pulls).

Feel free to report bugs. Please fill the issue template when opening an issue.

## License
[The MIT license](./LICENSE)
