import mongoose from 'mongoose';


const InfoSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  video: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
});


const Info = mongoose.model('Info', InfoSchema);

export default  Info;
