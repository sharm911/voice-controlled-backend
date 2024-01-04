const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const deivceSchema = new Schema({
  name: {
      type: String,
    },
  type: {
    type: String,
    required: true
  },
  roomId: {
    type: Number,
    required: true
  },

  status:{
    type: String,
    required: true
  },

  user: {
    type: {},
    ref: "User",
  },

  attribute1: {
    type: String,
  },
  
  attribute2: {
    type: String,
  },
  
  attribute3: {
    type: String,
  },
  
  attribute4: {
    type: String,
  },
  
  attribute5: {
    type: String,
  },
  
  attribute6: {
    type: String,
  },
  
  attribute7: {
    type: String,
  },
  
  attribute8: {
    type: String,
  },
});

deivceSchema.plugin(autoIncrement.plugin, { model: 'deivceSchema', field: 'deviceId', startAt: 1, incrementBy: 1 });

module.exports = mongoose.model('Device', deivceSchema);