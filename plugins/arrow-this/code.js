(new function f () {
    this.a = 1;
    return ((...b) => {
        return this.a;  
    }).bind({ a: 9 });
})();