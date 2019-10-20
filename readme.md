========== API DOCS ==========

<h1>[X] NON-Protected Routes</h1>
    
<h1>Register</h1>

*`HTTP method:`***`POST`**

*`URL:`***`/api/auth/register`**


<h3>User-Type: Parent</h3>

- Body

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| username       | string |   YES    |  YES   |                       |
| password       | String |   YES    |   NO   |                       |
| firstName      | String |   YES    |   NO   |                       |
| lastName       | String |   YES    |   NO   |                       |
| email          | String |   YES    |  YES   | must have "@" and "." |
| DOB            | date   |   YES    |   NO   |                       |
| phoneNum       | String |   YES    |   NO   |                       |
| emergencyPhone | String |   YES    |   NO   |                       |
| type           | String |   YES    |   NO   | must be "parent"      |


- Example
```
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "123-456-7890"
        "emergencyPhone": "098-765-4321",
        "type": "parent"
    }
```

- Responses
```
    Code: 201 (Created),
    Message: "Successfully Registered"

    code: 400 (Bad Request),
    Message: "Please provide all the required fields"

    Code: 400 (Bad Request),
    Message: "Please provide a valid email"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when registering user
```


<h3>User-Type: Volunteer</h3>


- Body

| Name            | Type    | Required | Unique | Description                          |
| :-------------- | :------ | :------: | :----: | :----------------------------------- |
| username        | string  |   YES    |  YES   |                                      |
| password        | String  |   YES    |   NO   |                                      |
| firstName       | String  |   YES    |   NO   |                                      |
| lastName        | String  |   YES    |   NO   |                                      |
| email           | String  |   YES    |  YES   | Must have "@" and "."                |
| DOB             | Date    |   YES    |   NO   |                                      |
| phoneNum        | String  |   YES    |   NO   |                                      |
| avgPerChild     | Float   |    NO    |   NO   | If not provided, defaults to "0"     |
| priceNegotiable | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| CPR_Certified   | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| type            | String  |   YES    |   NO   | Must be "volunteer"                  |


- Example
```
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "123-456-7890"
        "avgPerChild": 50.25,
        "priceNegotiable": false,
        "CPR_Certified": true,
        "type": "volunteer"
    }
```
- Responses
```
    Code: 201 (Created),
    Message: "Successfully Registered"

    code: 400 (Bad Request),
    Message: "Please provide all the required fields"

    Code: 400 (Bad Request),
    Message: "Please provide a valid email"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when registering user
```
____________

<h1>Login</h1>

*`HTTP method:`***`POST`**

*`URL:`***`/api/auth/login`**

<h3>User-Type: BOTH</h3>

- Body

| Name     | Type   | Required |
| :------- | :----- | :------: |
| username | string |   YES    |
| password | String |   YES    |


- Example
```
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
    }
```

- Responses
```
    Code: 201 (Created),
    Message: "Logged In! Your ID is 13"
    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ6ZWFsIiwiZmlyc3ROYW1lIjoiRWxhbiIsImxhc3ROYW1lIjoiUml6bmlzIiwidHlwZSI6InBhcmVudCIsImlhdCI6MTU3MTM3MjUyNCwiZXhwIjoxNTcxNDU4OTI0fQ.Y9Egs8GKEOl18ePYymcmPtjiynyv3LJg0ujkodjHOug"

    code: 400 (Bad Request),
    Message: "Wrong Password"

    Code: 404 (Not Found),
    Message: "Can't find an user with the specified username"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when logging in"
```
____________


<h1>[X] Protected Routes</h1>

<h3>Each one of these endpoints will require a HEADER</h3>

Like so:

|     name      |  type  |                               description                                |
| :-----------: | :----: | :----------------------------------------------------------------------: |
| authorization | String | Token to make sure that the endpoints are being used by a logged in user |


======== <h1>GET Requests</h1> ========

<h1>Logged In User</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/logged`**

- Body

```No Body Required!```

- Example

```
==== Volunteer ====
{
  "id": 5,
  "username": "johndoe",
  "password": "$2a$04$LIrEVjCvdZv98KdKXAIQouE8LE38ga9efNctjymLxe1Vk6uXpa0Oe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@gmail.com",
  "DOB": "03-13-1996",
  "phoneNum": "12345",
  "type": "volunteer",
  "avgPerChild": 10,
  "priceNegotiable": true,
  "CPR_Certified": true
}


==== Parent ====
{
  "id": 6,
  "username": "janedoe",
  "password": "$2a$04$w3o46k6r1PM1OLoB7rsTNu2KnZjnGHODZjK/MY5Tdgq2M7otOAziC",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@gmail.com",
  "DOB": "03-13-1996",
  "phoneNum": "12345",
  "type": "parent",
  "emergencyPhone": "32424"
}
```

- Responses
```
Code: 200 (OK)
Data: {Logged In User Object}

Code 500 (Internal Server Error)
Message: 'Something went wrong with the server!'
```
__________


<h1>All Parents</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/parents`**

- Body

```No Body Required!```

- Example

```
[
    {
        "id": 6,
        "username": "janedoe",
        "password": "$2a$04$w3o46k6r1PM1OLoB7rsTNu2KnZjnGHODZjK/MY5Tdgq2M7otOAziC",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "janedoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "12345",
        "type": "parent",
        "emergencyPhone": "32424"
    },
    {
        "id": 5,
        "username": "johndoe",
        "password": "$2a$04$LIrEVjCvdZv98KdKXAIQouE8LE38ga9efNctjymLxe1Vk6uXpa0Oe",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "12345",
        "type": "parent",
        "emergencyPhone": "2112313"
    }
]
```

- Responses
```
Code: 200 (OK)
Data: [Array with { Existing Parent Objects}]

Code 500 (Internal Server Error)
Message: 'Something went wrong with the server!'
```
__________

<h1>All Parents</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/parents`**

- Body

```No Body Required!```

- Example

```
[
    {
        "id": 6,
        "username": "janedoe",
        "password": "$2a$04$w3o46k6r1PM1OLoB7rsTNu2KnZjnGHODZjK/MY5Tdgq2M7otOAziC",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "janedoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "12345",
        "type": "volunteer",
        "avgPerChild": 50,
        "priceNegotiable": true,
        "CPR_Certified": false
    },
    {
        "id": 5,
        "username": "johndoe",
        "password": "$2a$04$LIrEVjCvdZv98KdKXAIQouE8LE38ga9efNctjymLxe1Vk6uXpa0Oe",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "12345",
        "type": "volunteer",
        "avgPerChild": 10,
        "priceNegotiable": false,
        "CPR_Certified": false
    }
]
```

- Responses
```
Code: 200 (OK)
Data: [Array with { Existing Volunteer Objects}]

Code 500 (Internal Server Error)
Message: 'Something went wrong with the server!'
```
__________


<h1>Single Parent by ID</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/parent/:id`**

- Body

```No Body Required!```

- Example

```
{
    "id": 5,
    "username": "johndoe",
    "password": "$2a$04$LIrEVjCvdZv98KdKXAIQouE8LE38ga9efNctjymLxe1Vk6uXpa0Oe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@gmail.com",
    "DOB": "03-13-1996",
    "phoneNum": "12345",
    "type": "parent",
    "emergencyPhone": '123-456-7890"
}
```

- Responses
```
Code: 200 (OK)
Data: { Specified] Parent Object }

Code: 404 (Not Found!)
Message: "Parent with an ID of [dynamic ID] could not be found."

Code 500 (Internal Server Error)
Message: 'Something went wrong with the server!'
```
__________


<h1>Single Volunteer by ID</h1>

*`HTTP method:`***`GET`**

*`URL:`***`/api/users/volunteer/:id`**

- Body

```No Body Required!```

- Example

```
{
    "id": 5,
    "username": "johndoe",
    "password": "$2a$04$LIrEVjCvdZv98KdKXAIQouE8LE38ga9efNctjymLxe1Vk6uXpa0Oe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@gmail.com",
    "DOB": "03-13-1996",
    "phoneNum": "12345",
    "type": "volunteer",
    "avgPerChild": 10,
    "priceNegotiable": false,
    "CPR_Certified": true
}
```

- Responses
```
Code: 200 (OK)
Data: { Specified Volunteer Object }

Code: 404 (Not Found!)
Message: "Volunteer with an ID of [dynamic ID] could not be found."

Code 500 (Internal Server Error)
Message: 'Something went wrong with the server!'
```
__________


========== <h1>PUT Requests</h1> ============

<h1>EDIT USER</h1>

*`HTTP method:`***`PUT`**

*`URL:`***`/api/users/user/edit/:id`**


<h3>User-Type: Parent</h3>

- Body

| Name           | Type   | Required | Unique | Description           |
| :------------- | :----- | :------: | :----: | :-------------------- |
| username       | string |   YES    |  YES   |                       |
| password       | String |   YES    |   NO   |                       |
| firstName      | String |   YES    |   NO   |                       |
| lastName       | String |   YES    |   NO   |                       |
| email          | String |   YES    |  YES   | must have "@" and "." |
| DOB            | date   |   YES    |   NO   |                       |
| phoneNum       | String |   YES    |   NO   |                       |
| emergencyPhone | String |   YES    |   NO   |                       |
| type           | String |   YES    |   NO   | must be "parent"      |


- Example
```
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "123-456-7890"
        "emergencyPhone": "098-765-4321",
        "type": "parent"
    }
```

- Responses
```
    Code: 201 (OK),
    Data: [Array of { Parent Objects with an updated Parent Object}]

    code: 400 (Bad Request),
    Message: "Please provide all the required fields"

    Code: 400 (Bad Request),
    Message: "Please provide a valid email"

    Code: 404 (Not Found),
    Message: "User with an ID of 10 does not exist!"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when registering user
```


<h3>User-Type: Volunteer</h3>


- Body

| Name            | Type    | Required | Unique | Description                          |
| :-------------- | :------ | :------: | :----: | :----------------------------------- |
| username        | string  |   YES    |  YES   |                                      |
| password        | String  |   YES    |   NO   |                                      |
| firstName       | String  |   YES    |   NO   |                                      |
| lastName        | String  |   YES    |   NO   |                                      |
| email           | String  |   YES    |  YES   | Must have "@" and "."                |
| DOB             | Date    |   YES    |   NO   |                                      |
| phoneNum        | String  |   YES    |   NO   |                                      |
| avgPerChild     | Float   |    NO    |   NO   | If not provided, defaults to "0"     |
| priceNegotiable | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| CPR_Certified   | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| type            | String  |   YES    |   NO   | Must be "volunteer"                  |


- Example
```
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "DOB": "03-13-1996",
        "phoneNum": "123-456-7890"
        "avgPerChild": 50.25,
        "priceNegotiable": false,
        "CPR_Certified": true,
        "type": "volunteer"
    }
```
- Responses
```
    Code: 201 (OK),
    Data: [Array of { Volunteer Objects with an updated Volunteer Object}]

    code: 400 (Bad Request),
    Message: "Please provide all the required fields"

    Code: 400 (Bad Request),
    Message: "Please provide a valid email"

    Code: 404 (Not Found),
    Message: "User with an ID of 10 does not exist!"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when registering user
```
____________