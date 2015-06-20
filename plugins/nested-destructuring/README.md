#### nested-destructuring

The answer to this problem is `a = [undefined], b = [undefined]`.

1. The variable `b` is set to `[undefined]`

2. The variable `a` is set to `undefined`

    Because the object to be destructured has its `a` property set to undefined, it assumes that it's not there. Therefore, `b` is assigned to `a`. However, `b` is not defined yet. Therefore `a` assumes the value `undefined`

3. `a = [undefined], b = [undefined]`