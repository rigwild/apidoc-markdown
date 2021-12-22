<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Header .md File

This is the content of the `header.md` file.

# Table of contents

- [Grouping](#Grouping)
  - [Grouping](#Grouping)

___

 > this quote is prepended to this doc using a file `prepend.md`

# <a name='Grouping'></a> Grouping

## <a name='Grouping'></a> Grouping
[Back to top](#top)

<p>Title and Grouping of param, success and error</p>

```
GET /test/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param1 | `String` | <p>No Group, automatically set Group to &quot;Parameter&quot;</p> |

### Parameters - `Replace &#34;login&#34; with this text.`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| param2 | `String` | <p>Group &quot;login&quot;</p> |
| param3 | `String` | <p>Group &quot;login&quot; with default Value</p>_Default value: Default Value_<br> |
### Success response

#### Success response - `201 - Everything ok, replace &#34;201&#34; with this text.`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success2 | `String` | <p>Group &quot;201&quot;</p> |
| success3 | `String` | <p>Group &quot;201&quot; with default Value</p>_Default value: Default Value_<br> |

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success1 | `String` | <p>No Group, automatically set &quot;Success 200&quot;</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error2 | `String` | <p>Undefined Group &quot;400&quot;</p> |

#### Error response - `401 - Oh oh, replace &#34;401&#34; with this text`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error3 | `String` | <p>Group &quot;401&quot;</p> |

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| error1 | `String` | <p>No Group automatically set &quot;Error 4xx&quot;</p> |

# Footer .md File

This is the content of the `footer.md` file.
