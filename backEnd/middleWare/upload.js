import multer from 'multer';
import path from 'path';



const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,"uploads")
    },

    filename:(req,file,cb)=>{

        const uniqueName =Date.now()+ "-"+Math.round(Math.random()*1000)
    cb(null,uniqueName+path.extname(file.originalname));
    }
})

const filter =(req,file,cb)=>{
    const allowed = /pdf|doc|docx|png|jpg|jpeg/
    const ext =path.extname(file.originalname).toLowerCase()
    if(allowed.test(ext)){


        cb(null,true)
    }else{
        cb(new Error("only pdf|doc|docx|png|jpg|jpeg allowed"))
    }
}
export const upload =multer({
    storage:storage,
    fileFilter:filter
})