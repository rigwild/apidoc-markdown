<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Table of contents

- [Define](#markdown-header-define)
  - [Define](#markdown-header-define)
- [Deprecated](#markdown-header-deprecated)
  - [Deprecated](#markdown-header-deprecated)
  - [Deprecated + content](#markdown-header-deprecated-+-content)
- [Escape](#markdown-header-escape)
  - [Escape Example](#markdown-header-escape-example)
- [Example](#markdown-header-example)
  - [Example](#markdown-header-example)
- [Group](#markdown-header-group)
  - [Group and Description](#markdown-header-group-and-description)
- [Grouping](#markdown-header-grouping)
  - [Grouping](#markdown-header-grouping)
- [Header](#markdown-header-header)
  - [Header Example](#markdown-header-header-example)
  - [Parameters](#markdown-header-parameters)
- [Language](#markdown-header-language)
  - [Clojure](#markdown-header-clojure)
  - [Clojure indented 1](#markdown-header-clojure-indented-1)
  - [CoffeeScript](#markdown-header-coffeescript)
  - [CoffeeScript indented 1](#markdown-header-coffeescript-indented-1)
  - [CoffeeScript indented 2](#markdown-header-coffeescript-indented-2)
  - [Erlang](#markdown-header-erlang)
  - [Erlang indented 1](#markdown-header-erlang-indented-1)
  - [Erlang indented 2](#markdown-header-erlang-indented-2)
  - [JavaScript](#markdown-header-javascript)
  - [JavaScript indented 1](#markdown-header-javascript-indented-1)
  - [JavaScript indented 2](#markdown-header-javascript-indented-2)
  - [Perl](#markdown-header-perl)
  - [Perl comment with pod and cut](#markdown-header-perl-comment-with-pod-and-cut)
  - [Perl indented 1](#markdown-header-perl-indented-1)
  - [Perl indented 2](#markdown-header-perl-indented-2)
  - [Python](#markdown-header-python)
  - [Python indented 1](#markdown-header-python-indented-1)
  - [Python indented 2](#markdown-header-python-indented-2)
  - [Ruby](#markdown-header-ruby)
  - [Ruby indented 1](#markdown-header-ruby-indented-1)
  - [Ruby indented 2](#markdown-header-ruby-indented-2)
- [Markdown](#markdown-header-markdown)
  - [Markdown](#markdown-header-markdown)
- [Param](#markdown-header-param)
  - [Errors](#markdown-header-errors)
  - [Param Example](#markdown-header-param-example)
  - [Parameters](#markdown-header-parameters)
  - [Success](#markdown-header-success)
- [Permission](#markdown-header-permission)
  - [Permission](#markdown-header-permission)
- [indent](#markdown-header-indent)
  - [Indent a word](#markdown-header-indent-a-word)
  - [Trim multi line (spaces)](#markdown-header-trim-multi-line-(spaces))
  - [Trim multi line (tabs and space)](#markdown-header-trim-multi-line-(tabs-and-space))
  - [Trim multi line (tabs)](#markdown-header-trim-multi-line-(tabs))
  - [Trim single line](#markdown-header-trim-single-line)
- [Category_official](#markdown-header-category_official)
  - [Delete a category](#markdown-header-delete-a-category)
  - [Get a category](#markdown-header-get-a-category)
- [City](#markdown-header-city)
  - [Create a new city](#markdown-header-create-a-new-city)
- [User](#markdown-header-user)
  - [Change a User](#markdown-header-change-a-user)
  - [Create a new User](#markdown-header-create-a-new-user)
  - [Delete user](#markdown-header-delete-user)
  - [Read data of a User](#markdown-header-read-data-of-a-user)
  - [Thank a user: this is quite a long name indeed](#markdown-header-thank-a-user:-this-is-quite-a-long-name-indeed)

___


# Define

## Define
[Back to top](#top)

Example of @apiDefine and @apiUse

```
GET /define
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| field3 |  | This is Field 3 (local). |
| field1 |  | This is Field 1. |
| field2 |  | This is Field 2. |


# Deprecated

## Deprecated
[Back to top](#top)

This is a simple deprecated hint.

```
GET /deprecated/foo/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 |  | Parameter and description. |


## Deprecated + content
[Back to top](#top)

This is a deprecated hint with a link to the new method.

```
GET /deprecated/bar/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 |  | Parameter and description. |


# Escape

## Escape Example
[Back to top](#top)

Escape Example data.

```
GET /test/escape
```


### Examples

Example usage:

```json
curl -i http://localhost/escape/text
<b>curl -i http://localhost/escape/html</b>
<xml>curl -i http://localhost/escape/xml</xml>
```


### Success response example

#### Success response example - `Example Response`

```json
HTTP/1.1 200 OK {
  field_text: 'text-value',
  field_html: '<b>html-value</b>',
  field_xml: '<xml>xml-value</xml>'
}
```

# Example

## Example
[Back to top](#top)

Extended usage of @apiExample with different example types.

```
GET /example/
```


### Examples

PHP Example (new)

```PHP
echo 'This is the content. (new)';
```

JS Example

```JS
console.log('This is the content.');
```


### Success response example

#### Success response example - `PHP Success Example (new)`

```PHP
echo 'This is the success content. (new)';
```

#### Success response example - `JS Success Example`

```JS
console.log('This is the success content.');
```

### Error response example

#### Error response example - `PHP Error Example`

```PHP
echo 'This is the error content.';
```

#### Error response example - `JS Error Example`

```JS
console.log('This is the error content.');
```

# Group

## Group and Description
[Back to top](#top)

```
GET /group/:id
```


# Grouping

## Grouping
[Back to top](#top)

Title and Grouping of param, success and error

```
GET /test/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 | `String` | No Group, automatically set Group to &quot;Parameter&quot; |

### Parameters - `Replace &#34;login&#34; with this text.`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param2 | `String` | Group &quot;login&quot; |
| param3 | `String` | Group &quot;login&quot; with default Value_Default value: Default Value_<br> |


### Success response

#### Success response - `201 - Everything ok, replace &#34;201&#34; with this text.`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success2 | `String` | Group &quot;201&quot; |
| success3 | `String` | Group &quot;201&quot; with default Value_Default value: Default Value_<br> |

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success1 | `String` | No Group, automatically set &quot;Success 200&quot; |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error2 | `String` | Undefined Group &quot;400&quot; |

#### Error response - `401 - Oh oh, replace &#34;401&#34; with this text`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error3 | `String` | Group &quot;401&quot; |

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error1 | `String` | No Group automatically set &quot;Error 4xx&quot; |

# Header

## Header Example
[Back to top](#top)

Usage of @headerExample.

```
GET /header/example/
```

### Header examples

An example:

```json
curl -i http://localhost/header/example/
```


## Parameters
[Back to top](#top)

Test for @apiHeader (same as @apiParam)

```
GET /header/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| header1 | `String` | Parameter with type and description. |
| header2 | `String` |  |
| header3 | `String` | Parameter with type, description and default value. |
| header4 | `String` |  |
| header5 |  | Basic Parameter with description. |
| header6 |  |  |
| header7 |  | Basic Parameter with description and default value. |
| header8 |  |  |
| header9 |  | **optional**Optional basic Parameter with description. |
| header10 |  | **optional** |
| header11 |  | **optional**Optional basic Parameter with description and default value. |
| header12 |  | **optional** |
| header13 | `String` | **optional**Optional Parameter with type and description. |
| header14 | `String` | **optional** |
| header15 | `String` | **optional**Optional Parameter with type, description and default value. |
| header16 | `String` | **optional** |

### Headers - `Request headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| reqHeader1 |  | Basic Parameter with description. |
| reqHeader2 |  | Basic Parameter with description. |


# Language

## Clojure
[Back to top](#top)

Test for Clojure Comment-Syntax.

```
GET /language/clojure
```


## Clojure indented 1
[Back to top](#top)

```
GET /language/clojure/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
		  Line 4 indented (with tab at beginning).
	  Line 5 indented.
This is example line 6.
```


## CoffeeScript
[Back to top](#top)

Test for CoffeeScript Comment-Syntax.

```
GET /language/coffeescript
```


## CoffeeScript indented 1
[Back to top](#top)

```
GET /language/coffeescript/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## CoffeeScript indented 2
[Back to top](#top)

```
GET /language/coffeescript/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Erlang
[Back to top](#top)

Test for Erlang Comment-Syntax.

```
GET /language/erlang
```


## Erlang indented 1
[Back to top](#top)

```
GET /language/erlang/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Erlang indented 2
[Back to top](#top)

```
GET /language/erlang/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
Line 4 indented (with tab at beginning).
Line 5 indented.
This is example line 6.
```


## JavaScript
[Back to top](#top)

Test for JavaScript Comment-Syntax.

```
GET /language/javascript
```


## JavaScript indented 1
[Back to top](#top)

```
GET /language/javascript/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## JavaScript indented 2
[Back to top](#top)

```
GET /language/javascript/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Perl
[Back to top](#top)

Test for Perl Comment-Syntax.

```
GET /language/perl
```


## Perl comment with pod and cut
[Back to top](#top)

```
GET /language/perl/podcut
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
        Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Perl indented 1
[Back to top](#top)

```
GET /language/perl/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
		Line 4 indented (with tab at beginning).
	Line 5 indented.
This is example line 6.
```


## Perl indented 2
[Back to top](#top)

```
GET /language/perl/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Python
[Back to top](#top)

Test for Python Comment-Syntax.

```
GET /language/python
```


## Python indented 1
[Back to top](#top)

```
GET /language/python/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Python indented 2
[Back to top](#top)

```
GET /language/python/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Ruby
[Back to top](#top)

Test for Ruby Comment-Syntax.

```
GET /language/ruby
```


## Ruby indented 1
[Back to top](#top)

```
GET /language/ruby/indented1
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


## Ruby indented 2
[Back to top](#top)

```
GET /language/ruby/indented2
```


### Examples

Test for indented comment.

```json
This is example line 2.
This is example line 3.
	    Line 4 indented (with tab at beginning).
    Line 5 indented.
This is example line 6.
```


# Markdown

## Markdown
[Back to top](#top)

Enable markdown for all description fields. <p>This <strong>text</strong> is in a <strong>separate</strong> p.</p> <ul> <li>List 1</li> <li>List 2</li> </ul> <p>Multiline markdown text, output in one line.</p>

```
GET /markdown/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 | `String` | This is a markdown <strong>apiParam</strong> <p>Separate line.</p> |


# Param

## Errors
[Back to top](#top)

Returned error parameters. Syntax is the same as for @apiParam

```
GET /param/:id
```


### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error1Error |  | This is Error 1. |
| error2Error |  | This is Error 2. |

## Param Example
[Back to top](#top)

Usage of @apiParamExample.

```
GET /param/example/
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | Fullname. |


### Examples

A common example:

```json
curl -i http://localhost/param/example/
```


### Parameters examples

`json` - A JSON example:

```json
{
  "name": "John Doe"
}
```

## Parameters
[Back to top](#top)

Parameters and different Versions: 0.1.1

```
GET /param/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 |  | Parameter and description. |
| param2 |  |  |
| param3 |  | Parameter, default value and description._Default value: Default Value_<br> |
| param4 |  | _Default value: Default Value_<br> |
| param5 |  | **optional** Optional parameter and description. |
| param6 |  | **optional**  |
| param7 |  | **optional** Optional parameter, default value and description._Default value: Default Value_<br> |
| param8 |  | **optional** _Default value: Default Value_<br> |
| param9 | `String` | Type, parameter and description. |
| param10 | `String` |  |
| param11 | `String` | Type, parameter and default value._Default value: Default Value_<br> |
| param12 | `String` | _Default value: Default Value_<br> |
| param13 | `String` | **optional** Type, optional parameter and description. |
| param14 | `String` | **optional**  |
| param15 | `String` | **optional** Type, optional parameter, default value and description._Default value: Default Value_<br> |
| param26 | `String` | **optional** _Default value: Default Value_<br> |
| param17 | `String` | Type, size, parameter and description._Size range: 4,8_<br> |
| param18 | `Number` | Type, size, parameter and description._Size range: 1-3_<br> |
| param19 | `String` | Type, size, parameter, default value and description._Default value: Default Value_<br>_Size range: 4,8_<br> |
| param20 | `Number` | Type, size, parameter, default value and description._Default value: 1_<br>_Size range: 1-3_<br> |
| param21 | `String` | Type, parameter and allowed string value._Allowed values: "value 1"_ |
| param22 | `String` | Type, parameter and allowed list of string values._Allowed values: "value 1","value 2"_ |
| param23 | `Number` | Type, parameter and allowed value._Allowed values: 4711_ |
| param24 | `Number` | Type, parameter and allowed list of values._Allowed values: 4711,4712_ |
| param25 | `String` | Type, size, parameter and allowed string value._Size range: 1,10_<br>_Allowed values: "value 1"_ |
| param27 | `Number` | Type, size, parameter and allowed value._Size range: 1-9999_<br>_Allowed values: 4711_ |
| param28 | `Number` | Type, size, parameter and allowed list of values._Size range: 1-9999_<br>_Allowed values: 4711,4712_ |


## Success
[Back to top](#top)

Returned success parameters. Syntax is the same as for @apiParam

```
GET /param/:id
```


### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success1 |  | This is Success 1. |
| success2 |  | This is Success 2. |

# Permission

## Permission
[Back to top](#top)

@apiPermission test.

```
GET /permission/
```


# indent

## Indent a word
[Back to top](#top)

text.

```
GET /indent/word
```


## Trim multi line (spaces)
[Back to top](#top)

Text line 1 (Begin: 4xSpaces (3 removed)). Text line 2 (Begin: 3xSpaces (3 removed), End: 2xSpaces).

```
GET /indent/trim/multi/spaces
```


## Trim multi line (tabs and space)
[Back to top](#top)

Text line 1 (Begin: 1xTab, 2xSpaces). Text line 2 (Begin: 3xSpaces, End: 1xTab).

```
GET /indent/trim/multi/tabs/and/space
```


## Trim multi line (tabs)
[Back to top](#top)

Text line 1 (Begin: 3xTab (2 removed)). Text line 2 (Begin: 2x Tab (2 removed), End: 1xTab).

```
GET /indent/trim/multi/tabs
```


## Trim single line
[Back to top](#top)

Text line 1 (Begin: 3xSpaces (3 removed), End: 1xSpace).

```
GET /indent/trim/single
```


# Category_official

## Delete a category
[Back to top](#top)

Delete a category. Sample request has been disabled here.

```
DELETE /category
```


### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | Category ID. |

### Parameters examples

`json` - Some json code:

```json
{
  "user": "Sample User",
   "payload": {
     "test": [
       "code": "
         public class HelloWorldTest {
           HelloWorld hw = new HelloWorld();
           @Test
           public void testOkay {
           assertEquals(\"HelloWorld\", hw.getMsg());
         }
      }"
     ]
   }
}
```

## Get a category
[Back to top](#top)

Get a category. Sample request on example.com here.

```
GET /category
```


### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | **optional** Category ID._Default value: 123_<br> |
| id2 | `Number` | Category ID2. |

# City

## Create a new city
[Back to top](#top)

Create a new city.

```
POST /city
```


### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| view | `String` | Type of view._Default value: Aerial_<br>_Allowed values: Aerial,Land,Underwater_ |
| zoom | `Number` | Zoom. |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | Name of the city_Default value: Paris_<br> |

# User

## Change a User
[Back to top](#top)

This function has same errors like POST /user, but errors not defined again, they were included with &quot;apiErrorStructure&quot;

```
PUT /user/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <code>id</code> of the user. |


### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | Name of the User. |
| avatar | `File` | Upload avatar. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNameTooShort |  | Minimum of 5 characters required. |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 400 Bad Request
{
  "error": "UserNameTooShort"
}
```

## Create a new User
[Back to top](#top)

In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.

```
POST /user
```


### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| age | `Number` | Age of the User |
| name | `String` | Name of the User_Default value: Caroline_<br> |
| extraInfo.hireDate | `Date` | Date when user was hired |
| extraInfo.hireDateWithDefault | `Date` | Date when user was hired with default_Default value: 2021-09-01_<br> |
| extraInfo.nickname | `String` | Nickname of the user |
| extraInfo.isVegan | `Boolean` | Is the user vegan? (boolean with default)_Default value: true_<br> |
| extraInfo.isAlive | `Boolean` | Is the user alive? (boolean with no default) |
| extraInfo.secrets.crush | `String` | The user secret crush |
| extraInfo.secrets.hair | `Number` | Number of hair of user_Default value: 1000_<br> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | The new Users-ID. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNameTooShort |  | Minimum of 5 characters required. |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 400 Bad Request
{
  "error": "UserNameTooShort"
}
```

## Delete user
[Back to top](#top)

Be careful! This will remove all the data associated with that user!

```
DELETE /user/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | The token can be generated from your user profile. |

### Header examples

Header-Example

```Header
"Authorization: token 5f048fe"
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <code>id</code> of the user. |


### Examples

Curl example

```bash
curl -X DELETE -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
```

Javascript example

```js
const client = AcmeCorpApi('5f048fe');
const user = client.deleteUser(42);
```

Python example

```python
client = AcmeCorpApi.Client(token="5f048fe")
user = client.delete_user(42)
```


### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| result | `String` | <code>ok</code> if everything went fine. |
| nullableField | `String` | **optional**This response field is not always there (can be null). |

### Success response example

#### Success response example - `Success-Example`

```json
HTTP/1.1 200 OK
{
    "result": "ok"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNotFound |  | The <code>id</code> of the User was not found. |

#### Error response - `500 Internal Server Error`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| InternalServerError |  | The server encountered an internal error. |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 401 Not Authenticated
{
  "error": "NoAccessRight"
}
```

## Read data of a User
[Back to top](#top)

Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.

```
GET /user/:region/:id/:opt
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | The token can be generated from your user profile. |
| X-Apidoc-Cool-Factor | `String` | Some other header with a default value. |

### Header examples

Header-Example

```Header
"Authorization: token 5f048fe"
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | User unique ID |
| region | `String` | User region_Default value: fr-par_<br> |
| opt | `String` | **optional** An optional param |


### Examples

Curl example

```bash
curl -H "Authorization: token 5f048fe" -i https://api.example.com/user/fr-par/4711
curl -H "Authorization: token 5f048fe" -H "X-Apidoc-Cool-Factor: superbig" -i https://api.example.com/user/de-ber/1337/yep
```

Javascript example

```js
const client = AcmeCorpApi('5f048fe');
const user = client.getUser(42);
```

Python example

```python
client = AcmeCorpApi.Client(token="5f048fe")
user = client.get_user(42)
```


### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | The Users-ID. |
| registered | `Date` | Registration Date. |
| name | `String` | Fullname of the User. |
| nicknames | `String[]` | List of Users nicknames (Array of Strings). |
| profile | `Object` | Profile data (example for an Object) |
| profile.age | `Number` | Users age. |
| profile.image | `String` | Avatar-Image. |
| options | `Object[]` | List of Users options (Array of Objects). |
| options.name | `String` | Option Name. |
| options.value | `String` | Option Value. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNotFound |  | The <code>id</code> of the User was not found. |

#### Error response - `500 Internal Server Error`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| InternalServerError |  | The server encountered an internal error |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 401 Not Authenticated
{
  "error": "NoAccessRight"
}
```

## Thank a user: this is quite a long name indeed
[Back to top](#top)

This is here to have a long name in the left menu.

```
POST /user/:id
```


