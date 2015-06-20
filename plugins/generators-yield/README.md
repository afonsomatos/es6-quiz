#### Generators-yield

The answer to this problem is `1`.

1. A generator function is created within the `for-of` loop

A generator is an iterator and it returns the next value *yielded* when `.next()` is called. To create an iterable from a generator, you call `generator()`.

2. The `for-of` loop creates an *iterable*, i and assigns each value yielded with `.next()` to that variable till there is nothing else to yield.

3. Because there is only one thing to yield, the `for-of` loop only runs once, and then it outputs via `console.log` the value that was yielded, `1`.