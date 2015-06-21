let obj = new Proxy({}, {
    get() {
        return 42;
    }
});

console.log(obj[undefined]);