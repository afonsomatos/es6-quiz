#### proxy-get

The answer to this problem is `42`

1. The `handler` which is the second argument given to the Proxy object, shadows the target object.

    `handler` has a `get()` method that is triggered whenever a property is accessed from the `target`.

2. The property `undefined` is requested.

3. The `handler` returns 42.

4. `console.log` outputs 42. 