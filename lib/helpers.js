import can from "can";
import _ from "lodash";

_.mapValues({
    eq: (a, b) => a === b,
    equal: (a, b) => _.isEqual(a, b),
    gt: (a, b) => a > b,
    gte: (a, b) => a >= b,
    lt: (a, b) => a < b,
    lte: (a, b) => a <= b
}, (comparisonFn, helperName) => {
    can.stache.registerHelper(helperName, function(a, b, options){
        if (comparisonFn(a, b)) {
            return options.fn();
        } else {
            return options.inverse();
        }
    });
});

can.stache.registerHelper("and", (...args) => {
    var opt = args[args.length-1];
    args = args.slice(0, args.length-1);
    return args.every(x => x) ? opt.fn() : opt.inverse();
});

can.stache.registerHelper("or", (...args) => {
    var opt = args[args.length-1];
    args = args.slice(0, args.length-1);
    return args.some(x => x) ? opt.fn() : opt.inverse();
});
