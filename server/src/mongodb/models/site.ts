import mongoose from "mongoose";

const Site = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    images: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
})

const SiteSchema = mongoose.model('Site', Site);

export default SiteSchema;