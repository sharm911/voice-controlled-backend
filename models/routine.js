const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const rotuineSchema = new Schema({
  name: {
      type: String,
    },

  time: {
    type: String,
    required: true
  },

  schedule: {
    type: String,
    required: true
  },

  isEnabled:{
    type: Boolean,
    required: true
  },

  deviceId: {
    type: Number,
    required: true
  },

  actionId: {
    type: Number,
    required: true
  },

  user: {
    type: {},
    ref: "User",
  },
});

rotuineSchema.plugin(autoIncrement.plugin, { model: 'rotuineSchema', field: 'routineId', startAt: 1, incrementBy: 1 });

module.exports = mongoose.model('Routine', rotuineSchema);