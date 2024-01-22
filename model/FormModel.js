
const mongoose = require('mongoose');
const slugify = require('slugify');


const path = require('path');



const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  productionOrderId: {
    type: String,
    required: true,
  },
  fileUpload: {
    type: String, 
    required: false,
  },
  textArea: {
  type: String
  },
  customTextAreaProcessing: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: false
  }});

formSchema.pre('validate', function(next) {
if (this.name) {
  const timestamp= Date.now();
  this.slug = slugify( `${this.name} -${timestamp}`, { lower: true, strict: true })
};

if (this.textArea !== null && this.issue === 'other') {
  
  this.customTextAreaProcessing = this.textArea;

  this.textArea = this.extArea;
}

 if (this.fileUpload) {

  this.fileUpload = path.basename(this.fileUpload);
 }

 
next()
})

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
