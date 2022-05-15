# Firebase serverless functions
The functions defined below enable role based authorisation to resourse held in the firebase real-time database.

You can learn more about firebase functions on the Firebase website [Cloud Functions for Firebase](https://firebase.google.com/docs/functions)

## Installation
Use the package manager [npm](https://github.com/mattcole75/firebase-functions) to install the firebase functions once you have cloned the repository. Then...

```bash
npm install
```

## Configuration
# Run the functions locally for testing
You can run the firebase functions locally on your environment. Use the following Firebase documentation as reference [local emulator](https://firebase.google.com/docs/functions/local-emulator)

# config.js
In the functions/configuration directory create a file: config.js. The content of the file will be as follows:

```
export const adminEmail = 'your.admin@email.com';
```

## Functions

### POST Create new user:

```
POST http://localhost:1337/auth/api/0.1/user

Requires JSON Body:
    {
        displayName: 'new display name',
        email: 'a valid email address',
        password: 'a hashed 256 character password'
    }

Returns:
    - 201 Created
    - 400 Duplicate entry
    - 400 Bad request - validation failure
    - 500 Internal error message
```
## License
[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0/)
