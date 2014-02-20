var _defaults = require('lodash-node/modern/objects/defaults');
var _each = require('lodash-node/modern/collections/forEach');
var _omit = require('lodash-node/modern/objects/omit');
var data = function (sport, year) {if (sport !== "ncaa-mens-hockey" || year !== "2013") throw new Error();return {"scoring":{"standard":[10,20,40,80]},"order":[1,4,2,3],"finalData":{"FF":{"name":"Frozen Four"}},"regions":[{"id":"E","name":"East","fullname":"East Region"},{"id":"MW","name":"Midwest","fullname":"Midwest Region"},{"id":"W","name":"West","fullname":"West Region"},{"id":"NE","name":"Northeast","fullname":"Northeast Region"}],"teams":{"E":["Quinnipiac","Boston College","Union","Canisius"],"MW":["Notre Dame","Miami (OH)","Minnesota State","St. Cloud State"],"W":["Minnesota","North Dakota","Niagara","Yale"],"NE":["UMass Lowell","New Hampshire","Denver","Wisconsin"]}};};
var methods = {
    bracket: require('../lib/bracket'),
    constants: require('../lib/constants'),
    regex: require('../lib/regex'),
    order: function (data) {
        return data.order;
    },
    scoring: function (data) {
        return data.scoring;
    },
    locks: function (data) {
        return data.locks;
    }
};

function Bracket(options) {
    _defaults(options, {
        props: ['bracket'],
        year: new Date().getFullYear(),
        sport: 'ncaa-mens-basketball',
        defaults: {}
    });

    var bracketData = data(options.sport, options.year);

    _each(options.props, function (prop) {
        if (options.defaults.hasOwnProperty(prop)) throw new Error('Cant set default for an existing property');
        this[prop] = typeof methods[prop] === 'function' && methods[prop](bracketData);
    }, this);

    _defaults(this, _omit(options, ['props', 'year', 'sport'].concat(options.props)), options.defaults || {});
}

module.exports = Bracket;
