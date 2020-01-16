<a name="top"></a>
# apidoc-example v0.3.0

apidoc example project

- [User](#User)
	- [Read data of a User](#Read-data-of-a-User)
	- [Create a new User](#Create-a-new-User)
	- [Create a User](#Create-a-User)
	- [Change a new User](#Change-a-new-User)
	

# <a name='User'></a> User

## <a name='Read-data-of-a-User'></a> Read data of a User
[Back to top](#top)

Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.

```
GET /user/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | The Users-ID. |

### Examples
CURL example:

```
   curl -i -X POST http://localhost:3001/example
        -H 'Content-Type: application/json' \
        -d '{ "id": "4711" }'

```

### Parameters examples
`json` - Param example:

```json
{
  "group": "Parameter",
  "type": "String",
  "filed": "id",
  "optional": false,
  "description": "The Users-ID."
}
```

### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | param.type | The Users-ID. |
| registered | param.type | Registration Date. |
| name | param.type | Fullname of the User. |

### Success response example
#### Success response example - `Success-Response (example):`

```
   HTTP/1.1 200 OK
   {
     "id": "4711"
     "registered": "31.01.2013"
     "name": "John Doe"
   }

```

### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNotFound |  | The <code>id</code> of the User was not found. |

### Error response example
#### Error response example - `Error-Response (example):`

```
   HTTP/1.1 401 Not Authenticated
   {
     "error": "NoAccessRight"
   }

```
## <a name='Create-a-new-User'></a> Create a new User
[Back to top](#top)

In this case "apiErrorStructure" is defined and used.
Define blocks with params that will be used in several functions, so you dont have to rewrite them.

```
POST /user
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | Name of the User. |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | param.type | The new Users-ID. |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNameTooShort |  | Minimum of 5 characters required. |

### Error response example
#### Error response example - ` Response (example):`

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
## <a name='Create-a-User'></a> Create a User
[Back to top](#top)

In this case "apiErrorStructure" is defined and used.
Define blocks with params that will be used in several functions, so you dont have to rewrite them.

```
POST /user
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | Name of the User. |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | param.type | The Users-ID. |


### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNameTooShort |  | Minimum of 5 characters required. |

### Error response example
#### Error response example - ` Response (example):`

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
## <a name='Change-a-new-User'></a> Change a new User
[Back to top](#top)

This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"

```
PUT /user/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | `String` | Name of the User. |




### Error response
#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NoAccessRight |  | Only authenticated Admins can access the data. |
| UserNameTooShort |  | Minimum of 5 characters required. |

### Error response example
#### Error response example - ` Response (example):`

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
