<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

# Table of contents

- [User](#User)
  - [Change a User](#Change-a-User)
  - [Create a new User](#Create-a-new-User)
  - [Delete user](#Delete-user)
  - [Read data of a User](#Read-data-of-a-User)
  - [Thank a user: this is quite a long name indeed](#Thank-a-user:-this-is-quite-a-long-name-indeed)

___


# <a name='User'></a> User

## <a name='Change-a-User'></a> Change a User
[Back to top](#top)

<p>This function has same errors like POST /user, but errors not defined again, they were included with &quot;apiErrorStructure&quot;</p>

```
PUT /user/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p><code>id</code> of the user.</p> |

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Name of the User.</p> |
| avatar | `File` | <p>Upload avatar.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | <p>Only authenticated Admins can access the data.</p> |
| UserNameTooShort |  | <p>Minimum of 5 characters required.</p> |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 400 Bad Request
{
  "error": "UserNameTooShort"
}
```

## <a name='Create-a-new-User'></a> Create a new User
[Back to top](#top)

<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>

```
POST /user
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| age | `Number` | <p>Age of the User</p> |
| name | `String` | <p>Name of the User</p>_Default value: Caroline_<br> |
| extraInfo.hireDate | `Date` | <p>Date when user was hired</p> |
| extraInfo.hireDateWithDefault | `Date` | <p>Date when user was hired with default</p>_Default value: 2021-09-01_<br> |
| extraInfo.nickname | `String` | <p>Nickname of the user</p> |
| extraInfo.isVegan | `Boolean` | <p>Is the user vegan? (boolean with default)</p>_Default value: true_<br> |
| extraInfo.isAlive | `Boolean` | <p>Is the user alive? (boolean with no default)</p> |
| extraInfo.secrets.crush | `String` | <p>The user secret crush</p> |
| extraInfo.secrets.hair | `Number` | <p>Number of hair of user</p>_Default value: 1000_<br> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The new Users-ID.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | <p>Only authenticated Admins can access the data.</p> |
| UserNameTooShort |  | <p>Minimum of 5 characters required.</p> |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 400 Bad Request
{
  "error": "UserNameTooShort"
}
```

## <a name='Delete-user'></a> Delete user
[Back to top](#top)

<p>Be careful! This will remove all the data associated with that user!</p>

```
DELETE /user/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The token can be generated from your user profile.</p> |

### Header examples

Header-Example

```Header
"Authorization: token 5f048fe"
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p><code>id</code> of the user.</p> |

### Examples

Curl example

```bash
curl -X DELETE -H "Authorization: token 5f048fe" -i https://api.example.com/user/4711
```

Javascript example

```js
const client = AcmeCorpApi('5f048fe');
const user = client.deleteUser(42);
```

Python example

```python
client = AcmeCorpApi.Client(token="5f048fe")
user = client.delete_user(42)
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| result | `String` | <p><code>ok</code> if everything went fine.</p> |
| nullableField | `String` | **optional**<p>This response field is not always there (can be null).</p> |

### Success response example

#### Success response example - `Success-Example`

```json
HTTP/1.1 200 OK
{
    "result": "ok"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | <p>Only authenticated Admins can access the data.</p> |
| UserNotFound |  | <p>The <code>id</code> of the User was not found.</p> |

#### Error response - `500 Internal Server Error`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| InternalServerError |  | <p>The server encountered an internal error.</p> |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 401 Not Authenticated
{
  "error": "NoAccessRight"
}
```

## <a name='Read-data-of-a-User'></a> Read data of a User
[Back to top](#top)

<p>Compare version 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.</p>

```
GET /user/:region/:id/:opt
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The token can be generated from your user profile.</p> |
| X-Apidoc-Cool-Factor | `String` | <p>Some other header with a default value.</p> |

### Header examples

Header-Example

```Header
"Authorization: token 5f048fe"
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>User unique ID</p> |
| region | `String` | <p>User region</p>_Default value: fr-par_<br> |
| opt | `String` | **optional** <p>An optional param</p> |

### Examples

Curl example

```bash
curl -H "Authorization: token 5f048fe" -i https://api.example.com/user/fr-par/4711
curl -H "Authorization: token 5f048fe" -H "X-Apidoc-Cool-Factor: superbig" -i https://api.example.com/user/de-ber/1337/yep
```

Javascript example

```js
const client = AcmeCorpApi('5f048fe');
const user = client.getUser(42);
```

Python example

```python
client = AcmeCorpApi.Client(token="5f048fe")
user = client.get_user(42)
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The Users-ID.</p> |
| registered | `Date` | <p>Registration Date.</p> |
| name | `String` | <p>Fullname of the User.</p> |
| nicknames | `String[]` | <p>List of Users nicknames (Array of Strings).</p> |
| profile | `Object` | <p>Profile data (example for an Object)</p> |
| profile.age | `Number` | <p>Users age.</p> |
| profile.image | `String` | <p>Avatar-Image.</p> |
| options | `Object[]` | <p>List of Users options (Array of Objects).</p> |
| options.name | `String` | <p>Option Name.</p> |
| options.value | `String` | <p>Option Value.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| NoAccessRight |  | <p>Only authenticated Admins can access the data.</p> |
| UserNotFound |  | <p>The <code>id</code> of the User was not found.</p> |

#### Error response - `500 Internal Server Error`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| InternalServerError |  | <p>The server encountered an internal error</p> |

### Error response example

#### Error response example - `Response (example):`

```json
HTTP/1.1 401 Not Authenticated
{
  "error": "NoAccessRight"
}
```

## <a name='Thank-a-user:-this-is-quite-a-long-name-indeed'></a> Thank a user: this is quite a long name indeed
[Back to top](#top)

<p>This is here to have a long name in the left menu.</p>

```
POST /user/:id
```

