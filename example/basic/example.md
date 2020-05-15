<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

- [Markdown](#Markdown)
	- [Markdown](#Markdown)
	
- [Example](#Example)
	- [Example](#Example)
	
- [Define](#Define)
	- [Define](#Define)
	
- [Deprecated](#Deprecated)
	- [Deprecated + content](#Deprecated-+-content)
	- [Deprecated](#Deprecated)
	
- [Escape](#Escape)
	- [Escape Example](#Escape-Example)
	
- [Group](#Group)
	- [Group and Description](#Group-and-Description)
	
- [Grouping](#Grouping)
	- [Grouping](#Grouping)
	
- [Header](#Header)
	- [Parameters](#Parameters)
	- [Header Example](#Header-Example)
	
- [Language](#Language)
	- [Clojure](#Clojure)
	- [Clojure indented 1](#Clojure-indented-1)
	- [CoffeeScript](#CoffeeScript)
	- [CoffeeScript indented 1](#CoffeeScript-indented-1)
	- [CoffeeScript indented 2](#CoffeeScript-indented-2)
	- [Erlang](#Erlang)
	- [Erlang indented 1](#Erlang-indented-1)
	- [Erlang indented 2](#Erlang-indented-2)
	- [JavaScript](#JavaScript)
	- [JavaScript indented 1](#JavaScript-indented-1)
	- [JavaScript indented 2](#JavaScript-indented-2)
	- [Perl](#Perl)
	- [Perl indented 1](#Perl-indented-1)
	- [Perl indented 2](#Perl-indented-2)
	- [Perl comment with pod and cut](#Perl-comment-with-pod-and-cut)
	- [Python](#Python)
	- [Python indented 1](#Python-indented-1)
	- [Python indented 2](#Python-indented-2)
	- [Ruby](#Ruby)
	- [Ruby indented 1](#Ruby-indented-1)
	- [Ruby indented 2](#Ruby-indented-2)
	
- [Param](#Param)
	- [Errors](#Errors)
	- [Parameters](#Parameters)
	- [Param Example](#Param-Example)
	- [Success](#Success)
	
- [Permission](#Permission)
	- [Permission](#Permission)
	
- [indent](#indent)
	- [Trim multi line (spaces)](#Trim-multi-line-(spaces))
	- [Trim multi line (tabs)](#Trim-multi-line-(tabs))
	- [Trim multi line (tabs and space)](#Trim-multi-line-(tabs-and-space))
	- [Trim single line](#Trim-single-line)
	- [Indent a word](#Indent-a-word)
	


# <a name='Markdown'></a> Markdown

## <a name='Markdown'></a> Markdown
[Back to top](#top)

<p>Enable markdown for all description fields.</p> <p>This <strong>text</strong> is in a <strong>separate</strong> p.</p> <ul> <li>List 1</li> <li>List 2</li> </ul> <p>Multiline markdown text, output in one line.</p>

```
GET /markdown/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param1 | `String` | <p>This is a markdown <strong>apiParam</strong></p> <p>Separate line.</p> |

# <a name='Example'></a> Example

## <a name='Example'></a> Example
[Back to top](#top)

<p>Extended usage of @apiExample with different example types.</p>

```
GET /example/
```

### Examples
PHP Example (new)

```
echo 'This is the content. (new)';
```
JS Example

```
console.log('This is the content.');
```

### Success response example

#### Success response example - `PHP Success Example (new)`

```
echo 'This is the success content. (new)';
```

#### Success response example - `JS Success Example`

```
console.log('This is the success content.');
```

### Error response example

#### Error response example - `PHP Error Example`

```
echo 'This is the error content.';
```

#### Error response example - `JS Error Example`

```
console.log('This is the error content.');
```

# <a name='Define'></a> Define

## <a name='Define'></a> Define
[Back to top](#top)

<p>Example of @apiDefine and @apiUse</p>

```
GET /define
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| field3 |  | <p>This is Field 3 (local).</p> |
| field1 |  | <p>This is Field 1.</p> |
| field2 |  | <p>This is Field 2.</p> |

# <a name='Deprecated'></a> Deprecated

## <a name='Deprecated-+-content'></a> Deprecated + content
[Back to top](#top)

<p>This is a deprecated hint with a link to the new method.</p>

```
GET /deprecated/bar/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param1 |  | <p>Parameter and description.</p> |

## <a name='Deprecated'></a> Deprecated
[Back to top](#top)

<p>This is a simple deprecated hint.</p>

```
GET /deprecated/foo/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param1 |  | <p>Parameter and description.</p> |

# <a name='Escape'></a> Escape

## <a name='Escape-Example'></a> Escape Example
[Back to top](#top)

<p>Escape Example data.</p>

```
GET /test/escape
```

### Examples
Example usage:

```
curl -i http://localhost/escape/text
<b>curl -i http://localhost/escape/html</b>
<xml>curl -i http://localhost/escape/xml</xml>
```

### Success response example

#### Success response example - `Example Response`

```
HTTP/1.1 200 OK {
  field_text: 'text-value',
  field_html: '<b>html-value</b>',
  field_xml: '<xml>xml-value</xml>'
}
```

# <a name='Group'></a> Group

## <a name='Group-and-Description'></a> Group and Description
[Back to top](#top)

```
GET /group/:id
```

# <a name='Grouping'></a> Grouping

## <a name='Grouping'></a> Grouping
[Back to top](#top)

<p>Title and Grouping of param, success and error</p>

```
GET /test/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param1 | `String` | <p>No Group, automatically set Group to &quot;Parameter&quot;</p> |

### Parameters - `Replace &#34;login&#34; with this text.`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param2 | `String` | <p>Group &quot;login&quot;</p> |
| param3 | `String` | <p>Group &quot;login&quot; with default Value</p>_Default value: Default Value_<br> |

### Success response

#### Success response - `201 - Everything ok, replace &#34;201&#34; with this text.`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| success2 | `String` | <p>Group &quot;201&quot;</p> |
| success3 | `String` | <p>Group &quot;201&quot; with default Value</p>_Default value: Default Value_<br> |

#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| success1 | `String` | <p>No Group, automatically set &quot;Success 200&quot;</p> |

### Error response

#### Error response - `400`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| error2 | `String` | <p>Undefined Group &quot;400&quot;</p> |

#### Error response - `401 - Oh oh, replace &#34;401&#34; with this text`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| error3 | `String` | <p>Group &quot;401&quot;</p> |

#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| error1 | `String` | <p>No Group automatically set &quot;Error 4xx&quot;</p> |

# <a name='Header'></a> Header

## <a name='Parameters'></a> Parameters
[Back to top](#top)

<p>Test for @apiHeader (same as @apiParam)</p>

```
GET /header/:id
```

### Header
| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| header1 | `String` | <p>Parameter with type and description.</p> |
| header2 | `String` |  |
| header3 | `String` | <p>Parameter with type, description and default value.</p> |
| header4 | `String` |  |
| header5 |  | <p>Basic Parameter with description.</p> |
| header6 |  |  |
| header7 |  | <p>Basic Parameter with description and default value.</p> |
| header8 |  |  |
| header9 |  | **optional**<p>Optional basic Parameter with description.</p> |
| header10 |  | **optional** |
| header11 |  | **optional**<p>Optional basic Parameter with description and default value.</p> |
| header12 |  | **optional** |
| header13 | `String` | **optional**<p>Optional Parameter with type and description.</p> |
| header14 | `String` | **optional** |
| header15 | `String` | **optional**<p>Optional Parameter with type, description and default value.</p> |
| header16 | `String` | **optional** |

## <a name='Header-Example'></a> Header Example
[Back to top](#top)

<p>Usage of @headerExample.</p>

```
GET /header/example/
```

### Header examples
An example:

```
curl -i http://localhost/header/example/
```

# <a name='Language'></a> Language

## <a name='Clojure'></a> Clojure
[Back to top](#top)

<p>Test for Clojure Comment-Syntax.</p>

```
GET /language/clojure
```

## <a name='Clojure-indented-1'></a> Clojure indented 1
[Back to top](#top)

```
GET /language/clojure/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
		  Line 4 indented (with tab at beginning).
	  Line 5 indented.
This is example line 6.
```

## <a name='CoffeeScript'></a> CoffeeScript
[Back to top](#top)

<p>Test for CoffeeScript Comment-Syntax.</p>

```
GET /language/coffeescript
```

## <a name='CoffeeScript-indented-1'></a> CoffeeScript indented 1
[Back to top](#top)

```
GET /language/coffeescript/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='CoffeeScript-indented-2'></a> CoffeeScript indented 2
[Back to top](#top)

```
GET /language/coffeescript/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Erlang'></a> Erlang
[Back to top](#top)

<p>Test for Erlang Comment-Syntax.</p>

```
GET /language/erlang
```

## <a name='Erlang-indented-1'></a> Erlang indented 1
[Back to top](#top)

```
GET /language/erlang/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Erlang-indented-2'></a> Erlang indented 2
[Back to top](#top)

```
GET /language/erlang/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
Line 4 indented (with tab at beginning).
Line 5 indented.
This is example line 6.
```

## <a name='JavaScript'></a> JavaScript
[Back to top](#top)

<p>Test for JavaScript Comment-Syntax.</p>

```
GET /language/javascript
```

## <a name='JavaScript-indented-1'></a> JavaScript indented 1
[Back to top](#top)

```
GET /language/javascript/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='JavaScript-indented-2'></a> JavaScript indented 2
[Back to top](#top)

```
GET /language/javascript/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Perl'></a> Perl
[Back to top](#top)

<p>Test for Perl Comment-Syntax.</p>

```
GET /language/perl
```

## <a name='Perl-indented-1'></a> Perl indented 1
[Back to top](#top)

```
GET /language/perl/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
		Line 4 indented (with tab at beginning).
	Line 5 indented.
This is example line 6.
```

## <a name='Perl-indented-2'></a> Perl indented 2
[Back to top](#top)

```
GET /language/perl/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Perl-comment-with-pod-and-cut'></a> Perl comment with pod and cut
[Back to top](#top)

```
GET /language/perl/podcut
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
        Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Python'></a> Python
[Back to top](#top)

<p>Test for Python Comment-Syntax.</p>

```
GET /language/python
```

## <a name='Python-indented-1'></a> Python indented 1
[Back to top](#top)

```
GET /language/python/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Python-indented-2'></a> Python indented 2
[Back to top](#top)

```
GET /language/python/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Ruby'></a> Ruby
[Back to top](#top)

<p>Test for Ruby Comment-Syntax.</p>

```
GET /language/ruby
```

## <a name='Ruby-indented-1'></a> Ruby indented 1
[Back to top](#top)

```
GET /language/ruby/indented1
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

## <a name='Ruby-indented-2'></a> Ruby indented 2
[Back to top](#top)

```
GET /language/ruby/indented2
```

### Examples
Test for indented comment.

```
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```

# <a name='Param'></a> Param

## <a name='Errors'></a> Errors
[Back to top](#top)

<p>Returned error parameters. Syntax is the same as for @apiParam</p>

```
GET /param/:id
```

### Error response

#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| error1Error |  | <p>This is Error 1.</p> |
| error2Error |  | <p>This is Error 2.</p> |

## <a name='Parameters'></a> Parameters
[Back to top](#top)

<p>Parameters and different Versions: 0.1.1</p>

```
GET /param/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| param1 |  | <p>Parameter and description.</p> |
| param2 |  |  |
| param3 |  | <p>Parameter, default value and description.</p>_Default value: Default Value_<br> |
| param4 |  | _Default value: Default Value_<br> |
| param5 |  | **optional** <p>Optional parameter and description.</p> |
| param6 |  | **optional**  |
| param7 |  | **optional** <p>Optional parameter, default value and description.</p>_Default value: Default Value_<br> |
| param8 |  | **optional** _Default value: Default Value_<br> |
| param9 | `String` | <p>Type, parameter and description.</p> |
| param10 | `String` |  |
| param11 | `String` | <p>Type, parameter and default value.</p>_Default value: Default Value_<br> |
| param12 | `String` | _Default value: Default Value_<br> |
| param13 | `String` | **optional** <p>Type, optional parameter and description.</p> |
| param14 | `String` | **optional**  |
| param15 | `String` | **optional** <p>Type, optional parameter, default value and description.</p>_Default value: Default Value_<br> |
| param26 | `String` | **optional** _Default value: Default Value_<br> |
| param17 | `String` | <p>Type, size, parameter and description.</p>_Size range: 4,8_<br> |
| param18 | `Number` | <p>Type, size, parameter and description.</p>_Size range: 1-3_<br> |
| param19 | `String` | <p>Type, size, parameter, default value and description.</p>_Default value: Default Value_<br>_Size range: 4,8_<br> |
| param20 | `Number` | <p>Type, size, parameter, default value and description.</p>_Default value: 1_<br>_Size range: 1-3_<br> |
| param21 | `String` | <p>Type, parameter and allowed string value.</p>_Allowed values: "value 1"_ |
| param22 | `String` | <p>Type, parameter and allowed list of string values.</p>_Allowed values: "value 1","value 2"_ |
| param23 | `Number` | <p>Type, parameter and allowed value.</p>_Allowed values: 4711_ |
| param24 | `Number` | <p>Type, parameter and allowed list of values.</p>_Allowed values: 4711,4712_ |
| param25 | `String` | <p>Type, size, parameter and allowed string value.</p>_Size range: 1,10_<br>_Allowed values: "value 1"_ |
| param27 | `Number` | <p>Type, size, parameter and allowed value.</p>_Size range: 1-9999_<br>_Allowed values: 4711_ |
| param28 | `Number` | <p>Type, size, parameter and allowed list of values.</p>_Size range: 1-9999_<br>_Allowed values: 4711,4712_ |
| param29 | `<a href="http://en.wikipedia.org/wiki/Data_type">Custom</a>` | <p>Type with markdown link.</p> |

## <a name='Param-Example'></a> Param Example
[Back to top](#top)

<p>Usage of @apiParamExample.</p>

```
GET /param/example/
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | <p>Fullname.</p> |

### Examples
A common example:

```
curl -i http://localhost/param/example/
```

### Parameters examples
`json` - A JSON example:

```json
{
  "name": "John Doe"
}
```

## <a name='Success'></a> Success
[Back to top](#top)

<p>Returned success parameters. Syntax is the same as for @apiParam</p>

```
GET /param/:id
```

### Error response

#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| success1 |  | <p>This is Success 1.</p> |
| success2 |  | <p>This is Success 2.</p> |

# <a name='Permission'></a> Permission

## <a name='Permission'></a> Permission
[Back to top](#top)

<p>@apiPermission test.</p>

```
GET /permission/
```

# <a name='indent'></a> indent

## <a name='Trim-multi-line-(spaces)'></a> Trim multi line (spaces)
[Back to top](#top)

<p>Text line 1 (Begin: 4xSpaces (3 removed)). Text line 2 (Begin: 3xSpaces (3 removed), End: 2xSpaces).</p>

```
GET /indent/trim/multi/spaces
```

## <a name='Trim-multi-line-(tabs)'></a> Trim multi line (tabs)
[Back to top](#top)

<p>Text line 1 (Begin: 3xTab (2 removed)). Text line 2 (Begin: 2x Tab (2 removed), End: 1xTab).</p>

```
GET /indent/trim/multi/tabs
```

## <a name='Trim-multi-line-(tabs-and-space)'></a> Trim multi line (tabs and space)
[Back to top](#top)

<p>Text line 1 (Begin: 1xTab, 2xSpaces). Text line 2 (Begin: 3xSpaces, End: 1xTab).</p>

```
GET /indent/trim/multi/tabs/and/space
```

## <a name='Trim-single-line'></a> Trim single line
[Back to top](#top)

<p>Text line 1 (Begin: 3xSpaces (3 removed), End: 1xSpace).</p>

```
GET /indent/trim/single
```

## <a name='Indent-a-word'></a> Indent a word
[Back to top](#top)

<p>text.</p>

```
GET /indent/word
```
