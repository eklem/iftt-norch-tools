// Modules and stuff required
var jhash = require('jhash')



// Reading http://openmymind.net/2012/2/3/Node-Require-and-Exports/ to try to figure "exports" out


// Adding and id to JSON object. Usefull for easy updating of index. Will overwrite object in index with equal id.
var Id = function(date, text, type) {
    // Creating an ID, and adding it to each item
    // Contains jhash of date+text+type strings
    obj.id = date
    obj.id += text
    obj.id += type
    obj.id = jhash.hash(obj.id)
    return obj.id
}


// Escaping special characters
String.prototype.escapeUnescape = function() {
  return this.replace(/\\n/g, "\\n")
             .replace(/\\'/g, "\\'")
             .replace(/\\"/g, '\\"')
             .replace(/\\&/g, "\\&")
             .replace(/\\r/g, "\\r")
             .replace(/\\t/g, "\\t")
             .replace(/\\b/g, "\\b")
             .replace(/\\f/g, "\\f");
};

module.exports.id = Id;
module.exports.escape = String.prototype.escapeUnescape;
