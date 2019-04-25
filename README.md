# @rigwild/apidoc-markdown
Generate API documentation in markdown from [apiDoc](https://github.com/apidoc/apidoc) data.

## Installation
```console
yarn add @rigwild/apidoc-markdown
```

## Usage
```console
Usage: apidoc-markdown -p [path] -o [output file]

Options:
	--path, -p      Path to generated apidoc output. Where api_data.json & api_project.json resides.  [required]
	--output, -o    Output file to write.                                                             [required]
	--template, -t  Path to EJS template file, if not specified default template will be used.
	--prepend       Prepend file after TOC.
```

## Example
Generate from included example data
```console
apidoc-markdown -p examples -o examples/example.md
```


[View generated example](https://github.com/martinj/node-apidoc-markdown/blob/master/examples/example.md)
