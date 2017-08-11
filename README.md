# log-fancy

[![Greenkeeper badge](https://badges.greenkeeper.io/Inkdpixels/log-fancy.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Inkdpixels/log-fancy.svg?branch=master)](https://travis-ci.org/Inkdpixels/log-fancy)
[![Dependency Status](https://david-dm.org/Inkdpixels/log-fancy.svg)](https://david-dm.org/Inkdpixels/log-fancy)
[![devDependency Status](https://david-dm.org/Inkdpixels/log-fancy/dev-status.svg)](https://david-dm.org/Inkdpixels/log-fancy#info=devDependencies&view=table)

> Logging in both Node and the browser the fancy way using the debug module with an API that provides log levels.

![output](https://user-images.githubusercontent.com/1557092/29221099-c9c672b4-7ebd-11e7-84ed-f3eba8467bbc.png)

## Installation
```sh
npm i log-fancy
```

## Usage
The package exports a single function, which takes the namespace of your module as an argument and returns the logger API.

```js
// logger.js
const logger = require('log-fancy')('myNamespace');

logger.info('This is not a monolith, but your mother is');
logger.warn('oiii mate, watch out');
logger.success('whee');
logger.debug('why is this even working?');
logger.log('hello');
logger.error('dis is broke m8');
logger.fatal('shit went wrong D:');
```

Now execute the script:
```sh
# Prints all messages
DEBUG='*' node logger.js

# Prints only warnings
DEBUG=*WARN* node logger.js

# Prints only messages in your namespace
DEBUG=*myNamespace* node logger.js
```

## API
The logger API consists of 8 methods, namely `fatal`, `error`, `success`, `warn`, `info`, `debug` and `log`.

The `fatal` method is the only one with divergent behavior:
* It traces the log up to the source file which triggered it which helps to debug the exception if necessary.
* It will always be rendered and does not use the `DEBUG` environment variable / the `debug` module since it doesn't make sense to not to print fatal errors at any time.
* It exits the process with code `1` which identifies the Node process as crashed.

All methods act like the native console API and take as many arguments as you like.

## Roadmap / Features to develop
- [ ] Add adapters / plugins, e.g. a plugin which forwards all messages to the `fs` or some logging service.
- [ ] Add configuration possible via a `.fancylogrc` which will be resolved from the root folder of the running process.

## Code style
Please make sure that you adhere to the code style which is based upon [xo](https://github.com/sindresorhus/eslint-config-xo).

## Licensing
See the `LICENSE` file at the root of the repository.
