const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : ( req , file , cb ) => {
        cb(null , path.join(__dirname,'../public'));
    }
})


module.exports = multer({storage});

