# <%= project.name %> v<%= project.version %>

<%= project.description %>

<% Object.keys(data).forEach(group => { -%>
 - [<%= group %>](#<%= group %>)
	<% Object.keys(data[group]).forEach(sub => { -%>
 - [<%= data[group][sub][0].title %>](#<%= data[group][sub][0].title.replace(/\s+/g, '-') %>)
	<% }) -%>

<% }) %>

<% if (prepend) { -%>
<%- prepend %>
<% } -%>
<% Object.keys(data).forEach(group => { -%>
# <%= group %>

<% Object.keys(data[group]).forEach(sub => { -%>
## <%= data[group][sub][0].title %>

<%- data[group][sub][0].description || '' %>

	<%- data[group][sub][0].type %> <%= data[group][sub][0].url %>

<% if (data[group][sub][0].header && data[group][sub][0].header.fields.Header.length) { -%>
### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% data[group][sub][0].header.fields.Header.forEach(header => { -%>
| <%- header.field %>			| <%- header.type %>			| <%- header.optional ? '**optional**' : '' %> <%- header.description %>							|
<% }) // foreach parameter -%>
<% } // if parameters -%>
<% if (data[group][sub][0].parameter && data[group][sub][0].parameter.fields && data[group][sub][0].parameter.fields.Parameter.length) { -%>

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% data[group][sub][0].parameter.fields.Parameter.forEach(function (param) { -%>
| <%- param.field %>			| <%- param.type %>			| <%- param.optional ? '**optional**' : '' %> <%- param.description %>							|
<% }) // foreach parameter -%>
<% } // if parameters -%>
<% if (data[group][sub][0].examples && data[group][sub][0].examples.length) { -%>

### Examples

<% data[group][sub][0].examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content -%>
```
<% }) // foreach example -%>
<% } // if example -%>

<% if (data[group][sub][0].success && data[group][sub][0].success.examples && data[group][sub][0].success.examples.length) { -%>
### Success Response

<% data[group][sub][0].success.examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content -%>
```
<% }) // foreach success example -%>
<% } // if examples -%>
<% if (data[group][sub][0].error && data[group][sub][0].error.examples && data[group][sub][0].error.examples.length) { -%>
### Error Response

<% data[group][sub][0].error.examples.forEach(example => { -%>
<%= example.title %>

```
<%- example.content -%>
```
<% }) // foreach error example -%>
<% } // if examples -%>
<% }) // foreach sub  -%>
<% }) // foreach group -%>

