---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: rigwild

---

## Describe the bug
A clear and concise description of what the bug is.

## Reproduce
### Usage
Used `apidoc-markdown` command or script.

```bash
apidoc-markdown -p ./examples/basic -o ./examples/basic/example.md
```

```ts
import { generateMarkdown } from 'apidoc-markdown'

const documentation = await generateMarkdown({
  apiDocProjectData: { name: 'test', version: '0.13.0', /* ... */ },
  apiDocApiData: [{ type: 'get', url: '/define', /* ... */ }],
  template: 'my EJS template <%= project.name %> v<%= project.version %>',
  prepend: 'Prepend this!',
  multi: false
})
```

### `api_project.json`
Used `api_project.json` file.

```json
{
  "name": "test",
  "version": "0.13.0",
  "description": "RESTful web API Documentation Generator",
  "url": "https://api.github.com/v1",
  "sampleUrl": "https://api.github.com/v1",
  "header": {
    "title": "My own header title",
    "content": "<h1>Header .md File</h1>\n<p>Content of header.md file.</p>\n"
  },
  "footer": {
    "title": "My own footer title",
    "content": "<h1>Footer .md File</h1>\n<p>Content of footer.md file.</p>\n"
  },
  "order": [
    "Markdown",
    "Example"
  ],
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2020-03-12T22:48:42.050Z",
    "url": "http://apidocjs.com",
    "version": "0.19.1"
  }
}
```

### `api_data.json`
Used `api_data.json` file.

```json
[
  {
    "type": "get",
    "url": "/define",
    "title": "Define",
    "name": "GetDefine",
    "group": "Define",
    "version": "0.8.0",
    "description": "<p>Example of @apiDefine and @apiUse</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "field3",
            "description": "<p>This is Field 3 (local).</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "field1",
            "description": "<p>This is Field 1.</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "field2",
            "description": "<p>This is Field 2.</p>"
          }
        ]
      }
    },
    "filename": "src/api_define.js",
    "groupTitle": "Define",
    "sampleRequest": [
      {
        "url": "https://api.github.com/v1/define"
      }
    ]
  }
]
```

**Expected behavior**
A clear and concise description of what you expected to happen.

**Versions (please complete the following information):**
 - `Node.js` version: `complete_this` [e.g. `13.9.0`]
 - `TypeScript` version: `complete_this` [e.g. `13.9.0`]
 - `apiDoc` version: `complete_this` [e.g. `0.20.0`]
 - `apidoc-markdown` version: `complete_this` [e.g. `1.12.3`]

**Additional context**
Add any other context about the problem here.
