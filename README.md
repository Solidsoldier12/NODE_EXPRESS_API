# NODE_EXPRESS_API
This is a Node JS and Express JS CRUD REST API that uses a local JSON file [routes -> users.json] as a Database

It contains routes to perform the following operations:

1. GET: To get the entries present in the Database
2. POST: To create new entries in the Database
3. DELETE: To delete entries from the Database
4. PATCH: To update value(s) of a particular entry in the Database using it's unique ID

IDs for the database entries is generated with the help of "uuid" package of the Node Package Manager

The API's routes have all been tested through Postman Software