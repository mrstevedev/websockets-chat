const Message = require('../models/Message');

// @desc Get all messages
// @route GET /chat
// @access Public 
exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();
        console.log('messages: ', messages);
        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        })
    } catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc Create a message 
// @route POST /api/v1/messages 
// @access Public
exports.addMessage = async (req, res, next) => {
    try {
        console.log('creating data..', req.body);
        const message = await Message.create(req.body);
        return res.status(200).json({ success: true, data: message })
    } catch(err) {
        console.error(err);
    }
};