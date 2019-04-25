# @rigwild/apidoc-markdown
![https://img.shields.io/npm/v/@rigwild/apidoc-markdown.svg?logo=npm](https://img.shields.io/npm/v/@rigwild/apidoc-markdown.svg?logo=npm)

Generate API documentation in markdown from [apiDoc](https://github.com/apidoc/apidoc) data.

This is an up to date and maintained fork of [@martinj/node-apidoc-markdown](https://github.com/martinj/node-apidoc-markdown) (which is not maintained).

## Installation
```sh
yarn global add @rigwild/apidoc-markdown
# or
npm i -g @rigwild/apidoc-markdown
```

## Usage
```console
Generate Markdown documentation from apiDoc data.
Usage: apidoc-markdown -p [path] -o [output file]

Options:
  --version       Show version number                                  [boolean]
  --path, -p      Path to generated apiDoc output directory. Where
                  `api_data.json` and `api_project.json` resides.
                                                             [string] [required]
  --output, -o    Output file to write.                      [string] [required]
  --template, -t  Path to EJS template file, if not specified default template
                  will be used.                                         [string]
  --prepend       Path to file content to add before route groups documentation.
  -h, --help      Show help                                            [boolean]

Examples:
  apidoc-markdown -p doc/ -o doc.md  Generate from `doc/` apiDoc output to `./doc.md`

@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown
```

## Example
Generate from included example data
```sh
apidoc-markdown -p examples -o examples/example.md
```

[View generated example](./examples/example.md)

## Todo
 - [x] Refactor project code
 - [x] Update and clean dependencies
 - [x] Refactor command-line tool
 - [x] Update Markdown default template to working EJS (Update breaking changes)
 - [ ] Update apiDoc example to newer version
 - [ ] Update default template for new apiDoc features

## License
[The MIT license](./LICENSE)
