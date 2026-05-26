const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        title: { type: String, required: true, trim: true },
        content: { type: [String], default: [] },
        image: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
