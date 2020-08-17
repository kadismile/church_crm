const bcrypt = require('bcryptjs');

exports.UserAfterUpdate = async (data, next) => {
  const newDoc = data.getUpdate();
  const oldDoc = await data.model.findOne(data.getQuery());
    
    if(newDoc.name && oldDoc.name !== newDoc.name){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$addToSet: {history: {
            event: "NAME_CHANGE",
            oldValue: oldDoc.name,
            newValue: newDoc.name,
            createdAt: new Date()
              }}})
      }catch (e) {
        return next(e);
      }
    }
    if(newDoc.address && oldDoc.address !== newDoc.address){
      try{
        await data.updateOne({ _id: oldDoc._id },
          {$addToSet: {history: {
            event: "ADDRESS_CHANGE",
            oldValue: oldDoc.address,
            newValue: newDoc.address,
            createdAt: new Date()
              }}
          })
      }catch (e) {
        return next(e);
      }
    }
    if(newDoc.password && oldDoc.password !== newDoc.password){
    try{
      const salt = await bcrypt.genSalt(10);
      newDoc.password = await bcrypt.hash(newDoc.password, salt);
      await data.updateOne({ _id: oldDoc._id },
          {
            password: newDoc.password,
            $addToSet: {
              history: {
                event: "PASSWORD_CHANGE",
                createdAt: new Date()
              }
            }
          })
    }catch (e) {
      return next(e);
    }
  }
    return next();
};

exports.UserBeforeSave = async (data) => {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    
    //check to see if its a church and User created
    if (!data.superAdmin) {
      //assigning a group to the new user created
      const church = await data.model('Church').findById(data.group);
      if (!church) throw new Error("Invalid Group provided");
      data.group = church._id;
    }
    
    
    return data
};