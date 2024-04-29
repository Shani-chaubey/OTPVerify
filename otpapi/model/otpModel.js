import mongoose from 'mongoose'


const otpSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expireAt: {
        type: Date,
        default: (Date.now() + 15 * 60 * 1000) // 15 minutes
        
    }
})

const Otp = mongoose.model('Otp', otpSchema)

export default Otp