const express = require("express");


const { ChatModel } = require("../model/Chat.madel");

const chatrouter = express.Router();

//all ChatModels

chatrouter.get("/all", async (req, res) => {
  try {
    const notes = await ChatModel.find();
    res.send(notes.reverse());
  } catch (error) {
    console.log(error)
  }

});


// get conversion
chatrouter.get("/get/:frist_person/:second_person", async (req, res) => {

  let frist_person = req.params.frist_person
  let second_person = req.params.second_person


  // console.log(found)

  try {


    let found = await ChatModel.find({ frist_person, second_person });

    if(found.length === 0){
    res.send("Start your conversion");

    }else{

      res.send(found);
    }


  } catch (error) {
    res.send("Start your conversion");

  }

});



// create chat pannel

chatrouter.post("/create/:frist_person/:second_person", async (req, res) => {

  let data = req.body
  let frist_person = req.params.frist_person
  let second_person = req.params.second_person

  try {
    const messages = new ChatModel({ frist_person, second_person, conversion: [data] });
    await messages.save();
    res.send("Now you can start your conversion");

  } catch (error) {
    res.send(error);

  }

});


// add message

chatrouter.post("/send/:frist_person/:second_person", async (req, res) => {

  let data = req.body
  let frist_person = req.params.frist_person
  let second_person = req.params.second_person


  try {


    await ChatModel.updateOne({ frist_person, second_person }, { $push: { conversion: data } });
    res.send("Send Message");

  } catch (error) {
    res.send(error);

  }

});




//delete ChatModel
chatrouter.delete("/:id", async (req, res) => {
  // if (req.body.ChatModelId === req.params.id || req.body.isAdmin) {
  try {
    await ChatModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
  // } else {
  //   return res.status(403).json("You can delete only your account!");
  // }
});



//get a ChatModel
chatrouter.get("/:id", async (req, res) => {
  try {
    const ChatModel = await ChatModel.findById(req.params.id);

    res.status(200).json(ChatModel);
  } catch (err) {
    res.status(500).json(err);
  }
});


//message 


// chat

chatrouter.post("/chat/:ChatModelid/:senderid", async (req, res) => {

  let data = req.body
  let ChatModelid = req.params.ChatModelid
  let senderid = req.params.senderid

  let sender = await ChatModel.findById({ _id: senderid });


  let filter = sender.chat.filter(e => e.ChatModelid !== ChatModelid)

  let update = sender.chat.filter(e => e.ChatModelid === ChatModelid).map((e) => {
    return e.message
  })





  if (filter === []) {
    const messages = { ChatModelid: ChatModelid, message: [data] };

    sender.chat.push(messages);

    await sender.save();
  } else {


    const result = await ChatModel.updateOne(
      { 'chat.ChatModelid': ChatModelid },
      { $push: { 'chat.$.message': data } }
    )
  }


});


// get chat 


chatrouter.get("/chat/:id/:ChatModelid", async (req, res) => {
  let senderid = req.params.id
  let ChatModelid = req.params.ChatModelid
  // console.log(senderid)
  try {
    let sender = await ChatModel.findById({ _id: senderid });

    let update = sender.chat.filter(e => e.ChatModelid === ChatModelid).map((e) => {
      return e.message
    })

    res.status(200).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = {
  chatrouter,
};


