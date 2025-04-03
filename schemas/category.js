const generateSlug = require('../utils/slugify');
let mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug: { type: String, unique: true },
    description:{
        type:String,
        default:"",
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

categorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
      this.slug = generateSlug(this.name);
    }
    next();
  });
module.exports = mongoose.model('category',categorySchema)
// products