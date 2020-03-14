---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: rigwild

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Used `apidoc-markdown` command or script.
```bash
apidoc-markdown -p ./examples/basic -o ./examples/basic/example.md
```

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

**Expected behavior**
A clear and concise description of what you expected to happen.

**Versions (please complete the following information):**
 - `Node.js` version: `complete_this` [e.g. `13.9.0`]
 - `apiDoc` version: `complete_this` [e.g. `0.20.0`]
 - `@rigwild/apidoc-markdown` version: `complete_this` [e.g. `1.12.3`]

**Additional context**
Add any other context about the problem here.
