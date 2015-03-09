// Reading http://openmymind.net/2012/2/3/Node-Require-and-Exports/ to try to figure "exports" out
// Modules and stuff required
var jhash = require('jhash')
require( 'useful-date' )
require( 'useful-date/locale/en-GB.js' )
var moment = require('moment')

// Characters and numbers used for hashing
jhash.setSymbols('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

// Adding and id to JSON object. Usefull for easy updating of index. Will overwrite object in index with equal id.
var Id = function(date, text, type) {
    // Creating an ID, and adding it to each item
    // Contains jhash of date+text+type strings
    id = date
    id += text
    id += type
    id = jhash.hash(id)
    return id
}

// Using useful-date (Date-coerse) to give moment something it can work with
var MachineDate = function(iftttOutputDate) {
    var datetransform = Date.coerce(iftttOutputDate, 'F d, Y <at> h:iA')
    date = moment(datetransform).format()
    return date
}

// Export functions as ifttnt:
// var ifttnt = require('iftt-norch-tools')
module.exports.id = Id
module.exports.date = MachineDate
