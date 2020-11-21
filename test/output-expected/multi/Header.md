<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

 - [Header](#Header)
   - [Header Example](#Header-Example)
   - [Parameters](#Parameters)

___


# <a name='Header'></a> Header

## <a name='Header-Example'></a> Header Example
[Back to top](#top)

<p>Usage of @headerExample.</p>

```
GET /header/example/
```

### Header examples
An example:

```json
curl -i http://localhost/header/example/
```

## <a name='Parameters'></a> Parameters
[Back to top](#top)

<p>Test for @apiHeader (same as @apiParam)</p>

```
GET /header/:id
```

### Headers - `Header`

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
