<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

- [Escape](#Escape)
	- [Escape Example](#Escape-Example)
	


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
