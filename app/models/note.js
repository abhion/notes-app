const mongoose = require('mongoose')

// schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true 
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
        // validate: {
        //     validator: function(value){
        //         return true
        //     },
        //     message: function(){
        //         return 'Something went wrong'
        //     }
        // }
    }
})

// noteSchema.pre('save', function(next){
//     console.log("going to save now");
//     next();
// })

// model 
const Note = mongoose.model('Note', noteSchema)

module.exports = Note