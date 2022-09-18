<div align="center">
	<br>
	<br>
	<img width="360" src="logo.png" alt="apidoc-markdown logo" />
	<br>
	<br>

📝 Generate a Simple and Portable Markdown documentation for your API

[![Node.js CI](https://github.com/rigwild/apidoc-markdown/workflows/Node.js%20CI/badge.svg)](https://github.com/rigwild/apidoc-markdown/actions)
[![npm package](https://img.shields.io/npm/v/apidoc-markdown.svg?logo=npm)](https://www.npmjs.com/package/apidoc-markdown)
[![npm downloads](https://img.shields.io/npm/dw/apidoc-markdown)](https://www.npmjs.com/package/apidoc-markdown)
[![license](https://img.shields.io/npm/l/apidoc-markdown?color=blue)](./LICENSE)

</div>

# apidoc-markdown

## Before starting

`apidoc-markdown` uses [apiDoc](https://github.com/apidoc/apidoc) internally. To generate your nice Markdown documentation, you first need to add some [apiDoc](https://github.com/apidoc/apidoc) API documentation comments in your code.

Take a look at https://apidocjs.com/ to discover it if it's your first time using it! 😉

You create your API documentation directly in your code with comments like this:

```ts
/**
 * @api {post} /admin/invite/new Send Invite
 * @apiPermission GlobalAdmin
 * @apiDescription Create & email a new Strider invite.
 * @apiName SendInvite
 * @apiGroup Admin
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} CURL Example:
 *    curl -X POST -d invite_code=xoxox -d email=me[at]email.com http://localhost/invite/new
 *
 * @apiParam (RequestBody) {String} invite_code The invite code/token to use in the invitation
 * @apiParam (RequestBody) {String} email The email address of the new user being invited
 */
app.post('/invite/new', (req, res) => res.end())
```

## How does it look? Give me some examples!

Some examples are available in the [`example`](./example) directory.

Take a look at [`example/strider/api.md`](./example/strider/api.md) which shows a real-world example taken from the [Strider](https://github.com/Strider-CD/strider) API.

## Install

```bash
# For the global CLI
pnpm install --global apidoc-markdown

# For programmatic usage or local project CLI install
pnpm install apidoc-markdown
```

Then, generate your documentation using your newly added command `apidoc-markdown` or [programmatically](#programmatic-usage-API).

**Note**: Node.js v14+ minimum is required. `apidoc-markdown` uses [`apidoc-light`](https://github.com/rigwild/apidoc-light) internally.

## CLI usage

```
Generate a Simple and Portable Markdown documentation for your API.
Usage: apidoc-markdown -i <path> -o <output_file> [-t <template_name>] [--multi] [--createPath] [--prepend <file_path>]

Options:
      --version     Show version number                                                                                            [boolean]
  -i, --input       Input source files path                                                             [string] [required] [default: "src"]
  -o, --output      Output file or directory to write output to.                                                         [string] [required]
  -t, --template    Name of the template to be used (`default`, `bitbucket`) or path to an EJS template file.  [string] [default: "default"]
      --header      Path to file content to add at the top of the documentation.                                                    [string]
      --footer      Path to file content to add at the bottom of the documentation.                                                 [string]
      --prepend     Path to file content to add before route groups documentation.                                                  [string]
      --multi       Output one file per group to the `output` directory.                                          [boolean] [default: false]
      --createPath  Recursively create directory arborescence to the `output` directory.                          [boolean] [default: false]
  -h, --help        Show help                                                                                                      [boolean]

Examples:
  apidoc-markdown -i src -o doc.md                           Generate from `src` source files to `doc.md`
  apidoc-markdown --input src --output doc.md                Generate from `src` source files to `doc.md`
  apidoc-markdown -i src -o doc.md -t bitbucket              Generate from `src` source files to `doc.md` using the `bitbucket` template
  apidoc-markdown -i src -o doc.md -t my_custom_template.md  Generate from `src` source files to `doc.md` using a provided template file
  apidoc-markdown -i src -o doc --multi                      Generate from `src` source files to `doc/<group>.md`

apidoc-markdown - https://github.com/rigwild/apidoc-markdown
```

### Examples

Generate documentation (See [`./example/basic/example.md`](./example/basic/example.md)).

```
apidoc-markdown -i src -o doc.md
```

You can select a provided template by using `-t` or `--template` (`default`, `bitbucket`).

```
apidoc-markdown -i src -o doc.md -t bitbucket
```

You can pass the path to your own template by using `-t` or `--template`.

```
apidoc-markdown -i src -o doc.md -t my_custom_template.md
```

You can inject a header, footer or prepend section in your documentation with the content of a file using `--header`, `--footer` and `--prepend`.

```
apidoc-markdown -i src -o doc.md --header header.md
apidoc-markdown -i src -o doc.md --footer footer.md
apidoc-markdown -i src -o doc.md --prepend prepend.md

apidoc-markdown -i src -o doc.md --header header.md --footer footer.md --prepend prepend.md
```

Generate documentation with one file per group (See [`./example/multi`](./example/multi)).

```
apidoc-markdown -i src -o doc --multi
```

### Quick and easy project integration

Install `apidoc-markdown` as a dev dependency.

```bash
pnpm install -D apidoc-markdown
```

Add the following script to your `package.json` file (`src` is where are stored your source files containing some [apiDoc](https://apidocjs.com/) annotations).

```json
{
  "scripts": {
    "doc": "apidoc-markdown -i src -o DOCUMENTATION.md"
  }
}
```

Run the npm script to generate the `DOCUMENTATION.md` file.

```bash
pnpm doc
```

## Programmatic usage API

#### generateMarkdownFileSystem

Generate mardown documentation using the file system and creating output file(s).

```ts
import path from 'path'
import { generateMarkdownFileSystem } from 'apidoc-markdown'

const documentation: Doc = await generateMarkdownFileSystem({
  /** Input source files path */
  input: path.resolve(__dirname, 'path', 'to', 'your', 'sources', 'directory'),

  /** Output file or directory to write output to */
  output: path.resolve(__dirname, 'doc.md'),

  /** Optional: Name of template to be used (`default`, `bitbucket`)
   * or path to EJS template file
   * or raw EJS plain text template
   * (will use default template if ommitted). */
  template: 'default',

  /** Optional: Path to file content to add at the top of the documentation */
  header: path.resolve(__dirname, 'add-this-to-the-top'),

  /** Optional: Path to file content to add at the bottom of the documentation */
  footer: path.resolve(__dirname, 'add-this-to-the-bottom'),

  /** Optional: Path to file content to add before route groups documentation */
  prepend: path.resolve(__dirname, 'prepend-this-to-api-routes'),

  /** Optional: Output one file per group to the `output` directory */
  multi: false,

  /** Optional: Recursively create directory arborescence to the `output` directory */
  createPath: true
})

// Output
type Doc = Array<{
  name: string // Api group name
  content: string // Documentation content
}>

// (if `multi` is `false`, you get an array with 1 element!)
```

#### generateMarkdown

Generate mardown documentation by passing directly the apiDoc output.

```ts
import { generateMarkdown } from 'apidoc-markdown'

const documentation: Doc = await generateMarkdown({
  /** apiDoc project JSON data object `apidoc.json` file content) */
  apiDocProjectData: { name: 'test', version: '0.13.0' /* ... */ },

  /** apiDoc documentation JSON data object (`api_data.json` file content) */
  apiDocApiData: [{ type: 'get', url: '/define' /* ... */ }],

  /** Optional: Name of template to be used (`default`, `bitbucket`)
   * or path to EJS template file
   * or raw EJS plain text template
   * (will use default template if ommitted). */
  template: 'my EJS template <%= project.name %> v<%= project.version %>',

  /** Optional: Content to add at the top of the documentation */
  header: 'Add this text at the top of the doc!',

  /** Optional: Content to add at the bottom of the documentation */
  footer: 'Add this text at the bottom of the doc!',

  /** Optional: Content to add before route groups documentation */
  prepend: 'Prepend this before the API routes documentation!',

  /** Optional: Generate one documentation output per group */
  multi: false
})

// Output
type Doc = Array<{
  name: string // Api group name
  content: string // Documentation content
}>

// (if `multi` is `false`, you get an array with 1 element!)
```

## Configuration

### Using `apidoc.json`

The `header`, `footer` and `prepend` options can be configured directly in your `apidoc.json` (see [`apidoc.json` documentation](https://apidocjs.com/#configuration)).

Add it like this:

```json
{
  "name": "test",
  "version": "0.1.2",
  "description": "test",
  "title": "test",
  "url": "https://test.example.com/",
  "header": {
    "filename": "header.md"
  },
  "footer": {
    "filename": "footer.md"
  },
  "prepend": {
    "filename": "prepend.md"
  }
}
```

**Note:** This only works if you use the CLI or [`generateMarkdownFileSystem`](#generateMarkdownFileSystem).

### API groups order

You can choose the order in which the documentation groups gets generated by adding an `order` key in `apidoc.json`. [See example `apidoc.json`](./test/_testFiles/input/apidoc.json#L15-L22) and [generated example output](./example/basic/example.md).

**Note:** This is only useful when generating the documentation to a single output file (`multi` is `false`).

## Contribute

Share your custom templates in [this discussion!](https://github.com/rigwild/apidoc-markdown/discussions/24)

Suggest any feature you would like by creating an [issue](https://github.com/rigwild/apidoc-markdown/issues) or a [pull request](https://github.com/rigwild/apidoc-markdown/pulls).

When reporting bugs, please fill the issue template correctly with as much info as possible to help me debug and understand what's happening.

⭐ Star the project to help it grow! 😄

## License

[The MIT license](./LICENSE)
