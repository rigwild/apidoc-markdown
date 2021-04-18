<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Header .md File

This is the content of the `header.md` file.

# Table of contents

- [Escape](#Escape)
  - [Escape Example](#Escape-Example)

___

 > this quote is prepended to this doc using a file `prepend.md`

# <a name='Escape'></a> Escape

## <a name='Escape-Example'></a> Escape Example
[Back to top](#top)

<p>Escape Example data.</p>

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

# Footer .md File

This is the content of the `footer.md` file.
