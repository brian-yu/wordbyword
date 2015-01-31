// simple-todos.js
Words = new Mongo.Collection("words");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    words: function () {
      return Words.find({});
    }
  });
  Template.body.events({
  "submit .new-word": function (event) {
    // This function is called when the new task form is submitted
    //var valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?,. ";
    var text = event.target.text.value;

     Words.insert({
       text: text,
       createdAt: 2 // current time
     });
     // Clear form
     event.target.text.value = "";
     // Prevent default form submit
     return false;
  },
  "click .clear": function() {
    Meteor.call('removeAllWords')
    //Words.insert({text: "Poop", createdAt: new Date()});
  }
});
}
if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllWords: function() {

        return Words.remove({});

      }

    });

  });

}