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

// Milliseconds since the Unix Epoch. Using useful-date (Date-coerse) to give moment something it can work with
var MachineDate = function(iftttOutputDate) {
    var datetransform = Date.coerce(iftttOutputDate, 'F d, Y <at> h:iA')
    date = moment(datetransform).valueOf()
    return date
}

// Using useful-date (Date-coerse) to give moment something it can work with
var ReadableDate = function(unixTime) {
    date = moment(unixTime).format()
    return date
}

// Extracting #tags from text,
// ... removing '#' if #tags exists (not null)
// ... and converting to lowercase
var Tags = function(text) {
    tags = text.match(/#[a-zæøå0-9]+/gi)
    if (tags != null) {
        for (var k = 0; k < tags.length; k++) {
            tags[k] = tags[k].replace(/#/, '').toLowerCase()
        }
    }
    return tags
}

// Extracting links from text
var Links = function(text) {
    links = text.match(/(https?:\/\/)[\S]+/g)
    return links
}

// Strip @ from users, change to array and extract users from text before adding to same array
var TwitterUsers = function(users, text) {
    // removing @ from user
    // creating to an array
    users = users.replace(/@/, '')
    users = [users]
    // extract users from text and push to array
    moreusers = text.match(/@[a-z0-9\_\-]+/gi)
    if (moreusers != null) {
      for (var j = 0; j < moreusers.length; j++) {
        moreusers[j]= moreusers[j].replace(/@/, '')
         users.push(moreusers[j])
      }
    }
    return users
}

// Which item is the newest (give array of Unix dates)
var FindNewestDate = function(unixdates) {
    return Math.max.apply(null, unixdates);
}



// Export functions as ifttnorch:
// var ifttnorch = require('iftt-norch-tools')
module.exports.id = Id
module.exports.date = MachineDate
module.exports.datehuman = ReadableDate
module.exports.tags = Tags
module.exports.links = Links
module.exports.twitterusers = TwitterUsers
module.exports.findnewestdate = FindNewestDate
