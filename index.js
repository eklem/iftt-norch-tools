// Reading http://openmymind.net/2012/2/3/Node-Require-and-Exports/ to try to figure "exports" out
// Modules and stuff required
var jhash = require('jhash')
require('useful-date')
require('useful-date/locale/en-GB.js')
var moment = require('moment')
var gravatar = require('gravatar')
var sanitizeHtml = require('sanitize-html')
var marked = require('marked')


// Characters and numbers used for hashing
jhash.setSymbols('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

// Adding and id to JSON object. Usefull for easy updating of index. Will overwrite object in index with equal id.
var Id = function(input) {
    // Creating an ID, and adding it to each item
    // Contains jhash of date+text+type strings
    id = jhash.hash(input)
    return id
}

// Milliseconds since the Unix Epoch. Using useful-date (Date-coerse) to give moment something it can work with
var MachineDate = function(iftttOutputDate, dayFormat) {
    var datetransform = Date.coerce(iftttOutputDate, 'F ' + dayFormat + ', Y <at> h:iA')
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
var TagsText = function(text) {
    tags = text.match(/#[a-zæøå0-9]+/gi)
    if (tags != null) {
        for (var k = 0; k < tags.length; k++) {
            tags[k] = tags[k].replace(/#/, '').toLowerCase()
        }
    }
    return tags
}

// Extracting tags from comma separated list
var TagsList = function(tags) {
    if (tags != null) {
      tags = tags.toLowerCase().split(', ')
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

var EmailAddress = function(email) {
    email = email.toLowerCase()
    return email
}

// This function is to be changed
// No matter which source it should return 'Display Name', 'Gravatar' and 'ID'
// ID will be indexed ID for user type results
var EmailUser = function(email) {
    email = email.toLowerCase()
    user = [email]
    return user
}

var EmailGravatar = function(email) {
    email = email.toLowerCase()
    gravatarimg = gravatar.url(email, {s: '200', r: 'pg', d: 'wavatar'}, true)
    return gravatarimg
}

// Should add some sort of salvaging nordic characters when fucked up
var SanitizeHtml = function(text) {
    text = sanitizeHtml(text, {
        allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img' ],
        allowedAttributes: {
            a: [ 'href', 'name', 'target' ],
            img: [ 'src' ]
        }
    })
    return text
}

var Markdown2Html = function(text) {
    if(text) {
        text = marked(text)
    }
    return text
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
module.exports.tagstext = TagsText
module.exports.tagslist = TagsList
module.exports.links = Links
module.exports.twitterusers = TwitterUsers
module.exports.emailaddress = EmailAddress
module.exports.emailuser = EmailUser
module.exports.emailgravatar = EmailGravatar
module.exports.sanitizehtml = SanitizeHtml
module.exports.markdown2html = Markdown2Html
module.exports.findnewestdate = FindNewestDate
