import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    notification: {
        type: Boolean,
        required: false,
    }
},{
    timestamps:true
})

export default mongoose.model('Administrator', userSchema)
