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

exports.UserBeforeSave = async (data) => {
    if (!data.isModified('password')) {
      next();
    }
    
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    
    //check to see if its a church and User created
    if (!data.superAdmin) {
      //assigning a group to the new user created
      const church = await data.model('Church').findById(data.group);
      if (!church) throw new Error("Invalid Group provided");
      data.group = church._id;
    }
    
    
    return data
};