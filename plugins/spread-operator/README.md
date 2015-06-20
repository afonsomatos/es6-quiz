#### spread-operator

The answer to this problem is `[[1,2]]`.

1. `Map.prototype.set` adds a new key to the map and maps it to `2`.

2. `Map.prototype.set` is chainable so it returns the Map object after it is called.

3. The `spread operator` is used along with the Map object, which is iterable and creates arrays `[key, value]`.

4. Since there is only one key-set, the result is `[[1,2]]`