# Gilded Rose

This is the Gilded Rose kata in TypeScript.

I chose to refactor it through the use of a factory where each item type is handled by its own dedicated service.

I used a functional approach, favoring keywords like `const` over `let`, early return statements instead of `else`, avoiding mutations so the code is predictable and side-effect free (even though the `items` property is still mutated as it is part of the requirements), and so on.

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

I chose to run tests with vitest

```sh
npm run test:vitest
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


