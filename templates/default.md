<a name="top"></a>
# <%= project.name %> v<%= project.version %>

<%= project.description %>

<% Object.keys(data).forEach(group => { -%>
- [<%= group %>](#<%= toLink(group) %>)
	<% Object.keys(data[group]).forEach(sub => { -%>
- [<%= data[group][sub][0].title %>](#<%= toLink(data[group][sub][0].title) %>)
	<% }) -%>

<% }) -%>

<% if (prepend) { -%>
<%- prepend %>
<% } -%>
<% Object.keys(data).forEach(group => { -%>
# <a name='<%= toLink(group) %>'></a> <%= group %>

<% Object.keys(data[group]).forEach(sub => { -%>
## <a name='<%= toLink(data[group][sub][0].title) %>'></a> <%= data[group][sub][0].title %>
[Back to top](#top)

<%- data[group][sub][0].description %>

```
<%- data[group][sub][0].type.toUpperCase() %> <%= data[group][sub][0].url %>
```
<% if (data[group][sub][0].header && data[group][sub][0].header.fields.Header.length) { -%>
### Headers
| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% data[group][sub][0].header.fields.Header.forEach(header => { -%>
| <%- header.field %> | <%- header.type %> | <%- header.optional ? '**optional**' : '' %><%- header.description %>|
<% }) // foreach parameter -%>
<% } // if parameters -%>

<% if (data[group][sub][0].header && data[group][sub][0].header.examples && data[group][sub][0].header.examples.length) { -%>

### Header Examples
<% data[group][sub][0].header.examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>
<% if (data[group][sub][0].parameter && data[group][sub][0].parameter.fields) { -%>
<% Object.keys(data[group][sub][0].parameter.fields).forEach(g => { -%>
### <%= g -%> Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
<% data[group][sub][0].parameter.fields[g].forEach(param => { -%>
| <%- param.field -%> | `<%- param.type -%>` | <%- param.optional ? '**optional**' : '' -%><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach (group) parameter -%>
<% }) // foreach param parameter -%>
<% } // if parameters -%>
<% if (data[group][sub][0].examples && data[group][sub][0].examples.length) { -%>

### Examples
<% data[group][sub][0].examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }) // foreach example -%>
<% } // if example -%>

<% if (data[group][sub][0].parameter && data[group][sub][0].parameter.examples && data[group][sub][0].parameter.examples.length) { -%>
### Param Examples
<% data[group][sub][0].parameter.examples.forEach(exampleParam => { -%>
`<%= exampleParam.type %>` - <%= exampleParam.title %>

```<%= exampleParam.type %>
<%- exampleParam.content %>
```
<% }) // foreach exampleParam -%>
<% } // if exampleParam -%>
<% if (data[group][sub][0].success && data[group][sub][0].success.examples && data[group][sub][0].success.examples.length) { -%>
### Success Response
<% data[group][sub][0].success.examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }) // foreach success example -%>
<% } // if examples -%>

<% if (data[group][sub][0].success && data[group][sub][0].success.fields) { -%>
<% Object.keys(data[group][sub][0].success.fields).forEach(g => { -%>
### <%= g %>
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
<% data[group][sub][0].success.fields[g].forEach(param => { -%>
| <%- param.field %> | `<%- param.type %>` | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } -%> |
<% }) // foreach (group) parameter -%>
<% }) // foreach field -%>
<% } // if success.fields -%>
<% if (data[group][sub][0].error && data[group][sub][0].error.examples && data[group][sub][0].error.examples.length) { -%>

### Error Response
<% data[group][sub][0].error.examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content %>
```
<% }) // foreach error example -%>
<% } // if examples -%>
<% }) // foreach sub  -%>
<% }) // foreach group -%>
