<a name="top"></a>
# AcmeCorp Api documentation v0.3.0

Documentation for the REST api access provided at AcmeCorp

- [User](#User)
	- [Read data of a User](#Read-data-of-a-User)
	- [Create a User](#Create-a-User)
	

# <a name='User'></a> User

## <a name='Read-data-of-a-User'></a> Read data of a User
[Back to top](#top)

<p>Here you can describe the function. Multilines are possible.</p>

```
GET /user/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | <p>The Users-ID.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | <p>The Users-ID.</p> |
| name | `Date` | <p>Fullname of the User.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| UserNotFound |  | <p>The <code>id</code> of the User was not found.</p> |

## <a name='Create-a-User'></a> Create a User
[Back to top](#top)

<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>

```
POST /user
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | <p>Name of the User.</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | <p>The Users-ID.</p> |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NoAccessRight |  | <p>Only authenticated Admins can access the data.</p> |
| UserNameTooShort |  | <p>Minimum of 5 characters required.</p> |

### Error response example
#### Error response example - `Response (example):`

```
HTTP/1.1 400 Bad Request
{
  "error": "UserNameTooShort"
}
```
