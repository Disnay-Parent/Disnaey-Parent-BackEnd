========== API DOCS ==========

[X] NON-Protected Routes
    
#### REGISTER ####

*`HTTP method:`***`POST`**
*`URL:`***`/api/auth/register`**


 + User-Type: Parent


```
Body
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
```

Example
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

Responses
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


####User-Type: Volunteer

Body
| Name            | Type    | Required | Unique | Description                          |
| :-------------- | :------ | :------: | :----: | :----------------------------------- |
| username        | string  |   YES    |  YES   |                                      |
| password        | String  |   YES    |   NO   |                                      |
| firstName       | String  |   YES    |   NO   |                                      |
| lastName        | String  |   YES    |   NO   |                                      |
| email           | String  |   YES    |  YES   | Must have "@" and "."                |
| DOB             | date    |   YES    |   NO   |                                      |
| phoneNum        | String  |   YES    |   NO   |                                      |
| avgPerChild     | Float   |    NO    |   NO   | If not provided, defaults to "0"     |
| priceNegotiable | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| CPR_Certified   | Boolean |    NO    |   NO   | If not provided, defaults to "false" |
| type            | String  |   YES    |   NO   | Must be "volunteer"                  |

######Example
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

######Responses
    Code: 201 (Created),
    Message: "Successfully Registered"

    code: 400 (Bad Request),
    Message: "Please provide all the required fields"

    Code: 400 (Bad Request),
    Message: "Please provide a valid email"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when registering user
____________

#Login

*`HTTP method:`***`POST`**
*`URL:`***`/api/auth/login`**

####User-Type: BOTH

Body
| Name     | Type   | Required |
| :------- | :----- | :------: |
| username | string |   YES    |
| password | String |   YES    |


######Example
    {
        "username": "IamTheCaptainNow",
        "password": "pass",
    }

######Responses
    Code: 201 (Created),
    Message: "Logged In! Your ID is 13"
    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ6ZWFsIiwiZmlyc3ROYW1lIjoiRWxhbiIsImxhc3ROYW1lIjoiUml6bmlzIiwidHlwZSI6InBhcmVudCIsImlhdCI6MTU3MTM3MjUyNCwiZXhwIjoxNTcxNDU4OTI0fQ.Y9Egs8GKEOl18ePYymcmPtjiynyv3LJg0ujkodjHOug"

    code: 400 (Bad Request),
    Message: "Wrong Password"

    Code: 404 (Not Found),
    Message: "Can't find an user with the specified username"

    Code: 500 (Internal Server Error),
    Message: "Something went wrong when logging in"
____________


















