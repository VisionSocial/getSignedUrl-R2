# S3 Signed Url Service

The purpose of this service is to have an interface for creating signed url to Amazon S3

R2 Docs 
https://developers.cloudflare.com/r2/api/s3/api/

AWS Docs 
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html

## Disclaimer
- Missing a deleteObjects implementation, only have a delete single object
- Missing a buckets implemntation
- Missing a abstraction layer for a object service and bucket service to work with the facade

### Installation

First, create your .env and edit as you need

```
cp .env.dummy .env
```

### Initialize

Run this command

```
npm install && npm update
```

### Running

If you want to run this project for making some manual testing or for modifying the code

```
npm run dev
```

### Testing

This project has configured unit testing with `jest`, if you want to run the test enter the next command

```
npm run test
```

Please, remmember to add a new test if you add some new stuffs

### Building

For compile this project run

```
npm run build
```

This command will generate a `./dist` folder where the compiled version of the application will be located.
