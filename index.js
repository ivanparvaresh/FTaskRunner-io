var easyxml = require("cheerio");

module.exports = function (container) {

    var tasks = [];


    tasks.push({
        name: "$",
        def: function (instance) {
            return {};
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input));
        }
    });

    /// this function find an element by a selector as jquery dom
    tasks.push({
        name: "$find",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            next(scope.$$input.find(scope.selector));
        }
    });

    // this function runs next chain on every dom elements
    tasks.push({
        name: "$each",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            for (var i = 0; i < scope.$$input.length; i++) {
                next(scope.$$input[i], false);
            };
        }
    });
    tasks.push({
        name: "$text",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input).text());
        }
    });
    tasks.push({
        name: "$html",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input).html());
        }
    });
    tasks.push({
        name: "$size",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input).length);
        }
    });
    tasks.push({
        name: "$attr",
        def: function (instance, name) {
            return {
                name: name
            };
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input).attr(scope.name));
        }
    });
    tasks.push({
        name: "$remove",
        def: function (instance, selector) {
            return {
                selector: selector
            };
        },
        exec: function (scope, next) {
            next(require("cheerio")(scope.$$input).remove(scope.selector));
        }
    });


    return tasks;
}
