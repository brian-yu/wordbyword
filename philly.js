// simple-todos.js
Words = new Mongo.Collection("words");
Nouns = new Mongo.Collection("nouns");
Adjectives = new Mongo.Collection("adjectives");

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("words");
  Template.body.helpers({
    words: function () {
      return Words.find({});
    },
    noun: function () {
      var random = _.sample(Nouns.find().fetch());
      return Nouns.find({_id: random && random._id}).text;
    },
    adjective: function () {
      var random = _.sample(Adjectives.find().fetch());
      return Adjectives.find({_id: random && random._id}).text;
    }
  });
  Template.body.events({
  "submit .new-word": function (event) {
    // This function is called when the new task form is submitted
    //var valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?,. ";
    var text = event.target.text.value;
    if(text.indexOf(" ") < 0) {
     Words.insert({
       text: text,
       createdAt: 2 // current time
     });
     // Clear form
     event.target.text.value = "";
     // Prevent default form submit
     return false;
   }
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
  Meteor.publish("words", function () {
    return Words.find();
  });
}