import mongoose from "mongoose";

const urlschema = new mongoose.Schema({
    shortCode: String,
    longUrl: String
})

export const Url = mongoose.model("shortURL", urlschema);