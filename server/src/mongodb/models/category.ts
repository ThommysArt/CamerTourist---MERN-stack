import mongoose from "mongoose";
import SiteSchema from "./site";

const Category = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String}
})

const CategorySchema = mongoose.model('Category', Category);

export default CategorySchema;