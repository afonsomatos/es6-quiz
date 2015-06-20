#### arrow-this

The answer to this problem is `1`.

1. The constructor is invoked by the keyword `new`, which creates a new object.

2. `this.a` is assigned to `1`

3. An arrow function is created and `.bind` is called.
 
  However, arrow functions have a lexical scope which means `this` points to whatever `this` is pointing in the wrapping function. So `this.a` points to `1`.

4. The returning arrow function is called and outputs `1`.