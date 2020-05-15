<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

 - [Param](#Param)
   - [Errors](#Errors)
   - [Parameters](#Parameters)
   - [Param Example](#Param-Example)
   - [Success](#Success)

___


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
|----------|------------|---------------------------------------|
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
|----------|------------|---------------------------------------|
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
|----------|------------|---------------------------------------|
| name | `String` | <p>Fullname.</p> |

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

## <a name='Success'></a> Success
[Back to top](#top)

<p>Returned success parameters. Syntax is the same as for @apiParam</p>

```
GET /param/:id
```

### Error response

#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success1 |  | <p>This is Success 1.</p> |
| success2 |  | <p>This is Success 2.</p> |
