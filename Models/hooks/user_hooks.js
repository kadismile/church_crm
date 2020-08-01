const bcrypt = require('bcryptjs');

exports.UserAfterUpdate = async (data,oldDoc, next) => {
    let newDoc = data.getUpdate().$set;
    if(oldDoc.name !== newDoc.name){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$push: {history: {
            event: "NAME_CHANGE",
            userId: oldDoc._id,
            oldValue: oldDoc.name,
            newValue: newDoc.name,
            createdAt: new Date()
              }}})
      }catch (e) {
        return next(e);
      }
    }
    if(oldDoc.address !== newDoc.address){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$push: {history: {
            event: "ADDRESS_CHANGE",
            userId: oldDoc._id,
            oldValue: oldDoc.address,
            newValue: newDoc.address,
            createdAt: new Date()
              }}
          })
      }catch (e) {
        return next(e);
      }
    }
    return next();
};

exports.UserBeforeCreate = async (data) => {
    if (!data.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return data
};