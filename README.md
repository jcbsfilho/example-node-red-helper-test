# Example Node-red Helper Test

This is the example of Node-red unit and integration tests, based on the module node-red-node-test-helper.


This example was made based on the `node-red-node-test-helper` module and there is a fork for the `github module:jcbsfilho/node-red-node-test-helper` and made a change to expose httpin in routes.

Link to module [node-red-node-test-helper](https://www.npmjs.com/package/node-red-node-test-helper).

Dependencies `package.json` file:

```json
...
  "dependencies": {
    "node-red": "^1.3.5"
  },
  "devDependencies": {
    "node-red-node-test-helper": "github:jcbsfilho/node-red-node-test-helper"
  }
...
```

## Unit Test

``` bash
  npm run test-unit
```

## Integration Test

``` bash
  npm run test-integration
```

## All Test

``` bash
  npm run test
```

## Results


```bash
> mocha "./test/**/*.spec.js"

  HTTP in Test Integration
    POST /users
      ✓ missing payload in request expect 400 bad request (97ms)
      ✓ success creating the user 201 create

  Function Unit Test
    Function Name req entry
      ✓ required fields when invalid
      ✓ required fields when valid
    Function Name check email
      ✓ check if the email is invalid
      ✓ check if the email is valid


  6 passing (369ms)

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
