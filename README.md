This application is archived and is no longer being developed


# Firebase serverless functions
The functions defined below enable role based authorisation to resourse held in the firebase real-time database.

You can learn more about firebase functions on the Firebase website [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)

## Installation
Use the package manager [npm](https://github.com/mattcole75/guardian-firebase-functions) to install the firebase functions once you have cloned the repository. Then run npm install in the root directory as well as the functions directory

```bash
npm install
```

You will also need firebase-tools
```bash
npm install -g firebase-tools 
```

## Configuration
# Run the functions locally for testing
You can run the firebase functions locally on your environment. Use the following Firebase documentation as reference [local emulator](https://firebase.google.com/docs/functions/local-emulator)

# config.js
In the functions/configuration directory create a file: config.js. The content of the file will be as follows:

```
const adminEmail = 'your.admin@email.com';
const apiKey = 'your google API Key'

module.exports = {
    adminEmail: adminEmail,
    apiKey: apiKey
}
```

## Testing
The functions come with a suite of auto test which are set up in the test directory and runs through the package.json file.
```
npm run test
```

## Functions
The url addresses below assume you are running the firebase funcation emulator locally.

### POST Create new user:

```
POST http://localhost:5001/guardian-d746f/europe-west1/api/user

Requires JSON body:
    {
        displayName: 'new display name',
        email: 'a valid email address',
        phoneNumber: 'phone number e.164 +44 7911 123456',
        organisation: 'an associated organisation',
        password: 'a hashed 256 character password'
    }

Returns:
    - 201 Created
    - 400 Duplicate entry
    - 400 Bad request - validation failure
    - 500 Internal error message
```
### GET user details:
```
GET http://localhost:5001/guardian-d746f/europe-west1/api/user

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok
        - localId
        - email
        - phoneNumber
        - displayName
        - role
        - organisation
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```
### GET all user details:
```
GET http://localhost:5001/guardian-d746f/europe-west1/api/users

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok [array]
        - localId
        - email
        - phoneNumber
        - displayName
        - role
        - organisation
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```
### PATCH user details:
```
PATCH http://localhost:5001/guardian-d746f/europe-west1/api/user

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Requires JSON body:
    {
        displayName: 'the display name',
        email: 'a valid email address',
        phoneNumber: 'phone number e.164 +44 7911 123456',
        organisation: 'an associated organisation'
        password: 'a hashed 256 character password'
    }

Returns:
    - 200 ok
    - 400 Missing fields
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```
### PATCH user details administrator:
```
PATCH http://localhost:5001/guardian-d746f/europe-west1/api/adminuser

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Requires JSON body:
    {
        displayName: 'the display name',
        email: 'a valid email address',
        phoneNumber: 'phone number e.164 +44 7911 123456',
        organisation: 'an associated organisation'
        role: ['designated role']
        password: 'a hashed 256 character password'
    }

Returns:
    - 200 ok
    - 400 Missing fields
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```
### DELETE user:
```
DELETE http://localhost:5001/guardian-d746f/europe-west1/api/user

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 ok
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### POST Request:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/request

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Requires JSON Body:
    {
        Application payload
    }

Returns: 
    - 201 created
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### PATCH Request:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/request

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Requires JSON Body:
    {
        Application payload
    }

Returns: 
    - 200 ok
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Requests:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/requests

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok [array] of requests created by the user
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Request:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/request

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id',
        param: 'request uid'
    }

Returns:
    - 200 Ok & request
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Coordinator Requests:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/coordinatorrequests

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok [array] of requests to a coordinator role with a status of 'submitted'
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Planner Requests:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/plannerrequests

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok [array] of requests to a planner role with a status of 'Submitted', 'Under Review', 'Granted', 'Denied'
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Disruption Authority Requests:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/disruptionauthorityrequests

Requires JSON header:
    {
        idToken: 'the given firebase auth token',
        localId: 'the given firebase user id'
    }

Returns:
    - 200 Ok [array] of requests to a planner role with a status of 'Submitted', 'Under Review', 'Granted', 'Denied'
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

### GET Public view:
```
POST http://localhost:5001/guardian-d746f/europe-west1/api/publicview

Requires JSON header:
    {
        startdate: 'yyyy-mm-dd',
        enddate: 'yyyy-mm-dd'
    }

Returns:
    - 200 Ok [array] of requests for public view based on start date and end date with a status of: 'Submitted', 'Under Review', 'Granted', 'Denied'
    - 401 Unauthorised
    - 403 Forbidden
    - 500 Internal error message
```

## Setup, development and testing guidlines 
#### use with care and stay away from the production environment

### To view which instance you are connecting to and what is available
```
firebase use
```

### To configure your firebase alias':
```
firebase use --add
```

### To switch between firebase instances:
```
firebase use "alias"
```
## License
[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0/)
