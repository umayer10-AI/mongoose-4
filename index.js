const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const run = async() => {
  try {
    // const user = await User.findById('6a3f2920b2a690729270783f')
    // const user = await User.find({name: 'Umayer'})
    // const user = await User.exists({name: 'Umayer'})
    // const user = await User.deleteOne({name: 'Umayer'})
    // const user = await User.where('name').equals('Umayer')
    // const user = await User.where('age').gt(22).lt(35).where('name').equals('ahmad')
    // const user = await User.where('age').gt(21).lt(35).where('name').equals('Umayer').limit(2).select('age')

    // const user = await User.where('age').gt(21).lt(35).where('name').equals('Umayer').limit(2)
    // user[0].bestFriend = '6a3ea673fa0d87b7f301b071'
    // await user[0].save()

    // const user = await User.findOne({ name: "Umayer" })
    // user.bestFriend = "6a3ea673fa0d87b7f301b071"
    // await user.save();

    const user = await User.where('age')
    .gt(21)
    .lt(35)
    .where('name')
    .equals('Umayer')
    .populate('bestFriend')
    // .populate("bestFriend", "name age")
    .limit(1)

    // const user = await User.findOne({ name: "Umayer" });
    // const friend = await User.findById(user.bestFriend);
    // user.bestFriend = friend;
    
    
    console.log(user)
    // console.log(user.length)

  } 
  catch (err) {
    console.log(err.message);
  }
}
run();