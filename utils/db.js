const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/im_gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Untuk Mongoose < 6
    useFindAndModify: false // Untuk Mongoose < 6
});



// Tambah 1 Data
// const member1 = new Member({
//     nama: 'Rizky',
//     umur: 20,
//     email: 'rizky@gmail.com',
//     nohp: '08123456789'
// })

// member1.save().then((result) => {
//     console.log(result)
// })