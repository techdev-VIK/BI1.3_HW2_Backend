const mongoose = require('mongoose');

//create schema

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category: [
        {
            type: String,
            enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other'],
            require: true,
        }
    ],
    location: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [
        {
            type: String
        }
    ],
    website: {
        type: String,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    checkInTime: {
        type: String,
        require: true,
    },
    checkOutTime: {
        type: String,
        require: true,
    },
    amenities: [
        {
            type: String,
        }
    ],
    priceRange: {
        type: String,
        enum: ['$50 - $199', '$200 - $999', '$1000 or Above']
    },
    reservationsNeeded: {
        type: Boolean,
        default: false,
    },
    isParkingAvailable: {
        type: Boolean,
        default: false,
    },
    isWifiAvailable: {
        type: Boolean,
        default: false,
    },
    isPoolAvailable: {
        type: Boolean,
        default: false,
    },
    isSpaAvailable: {
        type: Boolean,
        default: false,
    },
    isRestaurantAvailable: {
        type: Boolean,
        default: false,
    },
    photos: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
})

// create model

const Hotel = mongoose.model('Hotel', hotelSchema);


module.exports = Hotel;