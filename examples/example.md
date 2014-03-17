# apidoc-example v0.3.0

apidoc example project

- [User](#user)
	- [Read data of a User](#read-data-of-a-user)
	- [Create a new User](#create-a-new-user)
	- [Change a new User](#change-a-new-user)
	


# User

## Read data of a User

Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.

	GET /user/:id

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| String			|  The Users-ID.							|

### Examples

CURL example:

```
   curl -i -X POST http://localhost:3001/example
        -H 'Content-Type: application/json' \
        -d '{ "id": "4711" }'

```

### Success Response

Success-Response (example):

```
   HTTP/1.1 200 OK
   {
     "id": "4711"
     "registered": "31.01.2013"
     "name": "John Doe"
   }

```
### Error Response

Error-Response (example):

```
   HTTP/1.1 401 Not Authenticated
   {
     "error": "NoAccessRight"
   }

```
## Create a new User

In this case "apiErrorStructure" is defined and used.
Define blocks with params that will be used in several functions, so you dont have to rewrite them.

	POST /user

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  Name of the User.							|

### Error Response

 Response (example):

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```
## Change a new User

This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"

	PUT /user/:id

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  Name of the User.							|

### Error Response

 Response (example):

```
   HTTP/1.1 400 Bad Request
   {
     "error": "UserNameTooShort"
   }

```

