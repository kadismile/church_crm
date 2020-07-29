const mongoose = require('mongoose');
var randomstring = require("randomstring");

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate();
    }
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

//this is the hook after insert
UserSchema.post("save", async function(doc) {
  /*console.log('Inserted finished Again.', doc);*/
});

//this is the hook after update
//****you must use findOneAndUpdate from the controller for this to be fired.
UserSchema.post("findOneAndUpdate", async function(oldDoc, next) {
 /* let newDoc = this.getUpdate().$set ;

  if(oldDoc.title !== newDoc.title){
    try{
      let slug = newDoc.title.replace(/\s+/g, '-').toLowerCase();
      newDoc.slug = `${slug}-${oldDoc._id}`;
      await this.updateOne({ _id: oldDoc._id }, { $set: newDoc });
    }catch (e) {
      return next(e);
    }
  }
  return next();*/
});

module.exports = mongoose.model('Users', UserSchema);