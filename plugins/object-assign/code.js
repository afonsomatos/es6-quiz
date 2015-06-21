let obj = Object.assign(Array.prototype, {});

let a = obj instanceof Array,
    b = Array.isArray(obj);