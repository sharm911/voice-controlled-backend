const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const roomSchema = new Schema({
  name: {
      type: String,
    },
  type: {
    type: String,
    required: true
  },
  roomOwner: {
    type: String,
    required: true
  },
  user: {
    type: {},
    ref: "User",
  },
});

roomSchema.plugin(autoIncrement.plugin, { model: 'roomSchema', field: 'roomId', startAt: 1, incrementBy: 1 });

module.exports = mongoose.model('Room', roomSchema);
