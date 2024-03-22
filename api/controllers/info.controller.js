import Info from "../models/info.model.js";
import { errorHandle } from "../utils/error.js";


export const createInfo = async (req, res, next) => {
    
  
    const {  name, video, description } = req.body;
  
    const newinfo = new Info({
   
      name,
      video,
       description
    });
    try {
      const savedinfo = await newinfo.save();
      res.status(201).json(savedinfo);
    } catch (error) {
      next(error);
    }
  };



  export const getInfo = async (req, res, next) => {
    try {
     
  
     
  
        const infoo = await Info.find();
  
        if (infoo.length > 0) {
          res.json({
            message: "information details retrieved successfully",
            infoo,
          });
        } else {
          return next(errorHandle(404, " Information not fonud "));
        }
    
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };




  export const updateInfo = async (req, res, next) => {
   
    try {
      const updateInfo = await Info.findByIdAndUpdate(
        req.params.infooId,
        {
          $set: {
            
            name: req.body.name,
            video: req.body.video,
            description: req.body.description,
           
          },
        },
        { new: true }
      );
      res.status(200).json(updateInfo);
    } catch (error) {
      next(error);
    }
  };


  export const deleteInfo = async (req, res, next) => {
    
    try {
      await Info.findByIdAndDelete(req.params.InfoId);
      res.status(200).json("The info has been deleted");
    } catch (error) {
      next(error);
    }
  };