const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Message = new Schema({
    message: Schema.Types.String
})

const MessageModel = mongoose.model('Message', Message)

module.exports = MessageModel;
