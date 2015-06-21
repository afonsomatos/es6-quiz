#### object-assign

The answer to this problem is `a = false; b = true`.

1. `Object.assign` extends the object and creates a new one which is assigned to `obj`.

    The new object created is nothing much but the `Array.prototype` which is (little known fact) an `Array`. However, it's not an instance of the `Array`, since it's its prototype.
    ```javascript
    Array.prototype instanceof Array; // false
    Array.isArray(Array.prototype); // true
    ```
2. `a` is assigned to `false` and `b` is assigned to `true`.