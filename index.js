import express from 'express'
import cors from 'cors'
import multer from 'multer';
import  fs from 'node:fs'

const upload = multer({dest: 'uploads/'})

const app = express();

app.use(cors()); 

app.post('/imagenes/uploads',upload.single('file'), (req, res) => { 
    console.log(req.file);
    guardarImg(req.file);
});

app.post('/imagenes/multi',upload.array('fotos', 10 ),(req, res) => {
    console.log(req.files);
    req.files.map(guardarImg);
});

function guardarImg(file){
        const newPath= `./uploads/${file.originalname}`;
        fs.renameSync(file.path, newPath) 
        return newPath;
    }

        
    

app.listen(4000,()=>{
    console.log('Servidor corriendo en el puerto 4000');
})