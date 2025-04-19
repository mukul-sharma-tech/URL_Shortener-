// import { Url } from "../Models/Url";
import shortid from "shortid";
import { Url } from "../Models/Url.js";

export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:1000/${shortCode}`;

    //save to database
    const newURL = new Url({shortCode, longUrl});
    await newURL.save();
    console.log("ShortURL Saved: ", newURL);
    res.render("index.ejs",{shortUrl});
}

export const getOriginalUrl = async (req, res) => {
    const shortCode = req.params.shortCode;

    //find an database
    const originalUrl = await Url.findOne({shortCode});
    
    if(originalUrl){
        res.redirect(originalUrl.longUrl);
    }
    else{
        res.json({message: "Invalid Shortcode"});

        // res.status(404).send("Not Found");
    }

}