<a name="top"></a>
# AcmeCorp Api documentation v0.3.0

Documentation for the REST api access provided at AcmeCorp

- [Message](#Message)
	- [Create a message](#Create-a-message)
	

# <a name='Message'></a> Message

## <a name='Create-a-message'></a> Create a message
[Back to top](#top)

<p>In this case &quot;apiErrorStructure&quot; is defined and used. Define blocks with params that will be used in several functions, so you dont have to rewrite them.</p>

```
POST /user
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| content | `String` | <p>Content of the message</p> |


### Success response
#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` | <p>The Message-ID.</p> |



