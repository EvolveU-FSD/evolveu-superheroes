const mongoose = require('./dbAccess');
const Schema = mongoose.Schema;

const superheroSchema = new Schema({
  name: { type: String, required: true },
  nickname: String,
  alterego: String,
  sidekick: String,
  age: Number
});

const Superhero = mongoose.model('Superhero', superheroSchema, 'superhero');

module.exports = Superhero