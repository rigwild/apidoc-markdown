<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Header .md File

This is the content of the `header.md` file.

# Table of contents

- [Category_official](#Category_official)
  - [Delete a category](#Delete-a-category)
  - [Get a category](#Get-a-category)

___

 > this quote is prepended to this doc using a file `prepend.md`

# <a name='Category_official'></a> Category_official

## <a name='Delete-a-category'></a> Delete a category
[Back to top](#top)

<p>Delete a category. Sample request has been disabled here.</p>

```
DELETE /category
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Category ID.</p> |

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

## <a name='Get-a-category'></a> Get a category
[Back to top](#top)

<p>Get a category. Sample request on example.com here.</p>

```
GET /category
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | **optional** <p>Category ID.</p>_Default value: 123_<br> |
| id2 | `Number` | <p>Category ID2.</p> |

# Footer .md File

This is the content of the `footer.md` file.
