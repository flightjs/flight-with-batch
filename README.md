# flight-with-batch

A [Flight](https://github.com/flightjs/flight) mixin for efficiently batching function calls into animation frames. Particularly useful for coalescing DOM updates.

## Installation

```bash
bower install --save flight-with-batch
```

## Example

Here's an example component that uses with `withBatch`.

```js
var ToggleButton = flight.component(
    withBatch,
    function toggleButton() {
        this.after('initialize', function () {
            this.on('click', this.toggle);
            // Use `this.batchify` to make a function that, when called, with batch a call to
            // the method name you supply
            this.after('toggle', this.batchify('update'));

            // Use `this.batch` to call a function when the browser is ready
            this.batch(this.update);
        });

        this.toggle = function () {
            this.isActive = !this.isActive;
        };

        this.update = function () {
            this.$node.toggleClass('is-active', this.isActive);
        };
    }
);
```

## API

### `batch`

`batch` takes a function and calls it on the next animation frame using `requestAnimationFrame` (falling back to `setTimeout` if unavailable) with the context it was called with – most likely, this is the component instance.

Functions are added to a shared queue, so multiple component's batched calls will end up in the same queue.

### `batchify`

`batchify` takes a string and makes a function that, when called, `batch`-es a call to the method named by the string.

## Development

Development of this component requires [Bower](http://bower.io) to be globally
installed:

```bash
npm install -g bower
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install & bower install
```

To continuously run the tests in Chrome during development, just run:

```bash
npm run watch-test
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
