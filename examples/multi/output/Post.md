<a name="top"></a>
# apidoc-example v0.3.0

apidoc example project

- [Post](#Post)
	- [Read a post](#Read-a-post)
	

# <a name='Post'></a> Post

## <a name='Read-a-post'></a> Read a post
[Back to top](#top)

Here you can describe the function.
Multilines are possible.

```
GET /post/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | The post ID. |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | param.type | The post ID. |
| name | param.type | Creation date of the post. |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| UserNotFound |  | The <code>id</code> of the User was not found. |

