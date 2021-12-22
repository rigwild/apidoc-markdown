<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Header .md File

This is the content of the `header.md` file.

# Table of contents

- [City](#City)
  - [Create a new city](#Create-a-new-city)

___

 > this quote is prepended to this doc using a file `prepend.md`

# <a name='City'></a> City

## <a name='Create-a-new-city'></a> Create a new city
[Back to top](#top)

<p>Create a new city.</p>

```
POST /city
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| view | `String` | <p>Type of view.</p>_Default value: Aerial_<br>_Allowed values: Aerial,Land,Underwater_ |
| zoom | `Number` | <p>Zoom.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Name of the city</p>_Default value: Paris_<br> |

# Footer .md File

This is the content of the `footer.md` file.
