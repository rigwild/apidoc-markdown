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

### Parameter Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | The post ID. |


### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | The post ID. |
| name | `Date` | Creation date of the post. |
