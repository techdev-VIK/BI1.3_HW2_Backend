const express = require('express');

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const {intializeDatabase} = require('./db/db.connect');

const Hotel = require('./models/hotel.models');

app.use(express.json());

intializeDatabase();



app.get('/', async(req, res) => {
    res.send('Welcome to Hotels Website')
})


async function createHotel(newHotel){
    try {
      const hotel = new Hotel(newHotel);
      await hotel.save();
      return hotel;
    } catch (error) {
        console.log(error)
        throw error;
    }
  }
  
  
  app.post('/hotels/newHotel', async (req, res) => {
      try {
        const savedHotel = await createHotel(req.body);
        res.status(201).json({message: 'Hotel added successfully.', hotel: savedHotel})
      } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to add restaurant'})
      }
  })




async function readByHotel() {
    try {
        const readAllHotels = await Hotel.find();
        return readAllHotels;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.get('/hotels', async(req, res) => {
    try {
        const getHotels = await readByHotel();

        if(getHotels){
            res.json(getHotels)
        }else{
            res.status(404).json({error: 'Hotels not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to find hotels.'})
    }
})



async function readByTitle(titleName) {
    try {
        const getHotelByTitle = await Hotel.findOne({name: titleName})
        return getHotelByTitle;

    } catch (error) {
        console.log(error);
        throw error;
    }
}


app.get('/hotels/title/:title', async (req, res) => {
    try {
        const getHotel = await readByTitle(req.params.title);
        
        if(getHotel){
            res.json(getHotel)
        }else{
            res.status(404).json({error: 'Hotel not found'})
        }

    } catch (error) {
        res.status(500).json({error: 'Failed to find hotels.'})
    }
})




async function updateHotel(hotelId, dataToUpdate){
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate);

        return updatedHotel;

    } catch (error) {
        console.log('Error is updating hotel data', error);
    }
}

app.post('/hotel/:hotelId', async(req, res) => {
    try {
        const updatedHotel = await updateHotel(req.params.hotelId, req.body);

        if(updatedHotel){
            res.status(200).json({message: 'Data updated successfully', updatedHotel})
        }else{
            res.status(404).json({error: 'Failed to find id'})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update data."})
    }

})


async function deleteHotel(hotelId){
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    } catch (error) {
        console.log(error);
    }
  }
  
  
  app.delete('/hotels/deleteHotel/:hotelId', async (req, res) => {
    try {
        const delHotel = await deleteHotel(req.params.hotelId);
        res.status(200).json({message: 'Hotel deleted successfully.', delHotel})
    } catch (error) {
        res.status(500).json({error: 'Failed to delete hotel.'})
    }
  })


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})