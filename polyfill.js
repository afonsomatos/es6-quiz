// Array.prototype.findIndex
if (!Array.prototype.findIndex) {

    Array.prototype.findIndex = function(predicate, thisArg) {

        if (this == null)
            throw new TypeError('Array.prototype.findIndex called on null or undefined');

        if (typeof predicate !== 'function')
            throw new TypeError('predicate must be a function');

        let list = Object(this),
            length = list.length >>> 0;

        for (let i = 0; i < length; i++) {

            let value = list[i];

            if (predicate.call(thisArg, value, i, list))
                return i;

        }

        return -1;
    };

}