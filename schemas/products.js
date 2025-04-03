const generateSlug = require('../utils/slugify');
let mongoose = require('mongoose');
let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug: { type: String, unique: true },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        default:0,
        required:true,
        min:0
    },
    description:{
        type:String,
        default:"",
    },
    urlImg:{
        type:String,
        default:"",
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});
productSchema.pre('save', function(next) {
    if (this.isModified('name')) {
      this.slug = generateSlug(this.name);
    }
    next();
  });
module.exports = mongoose.model('product',productSchema)
// products