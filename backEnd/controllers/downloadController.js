import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs';



const _fileName =fileURLToPath(import.meta.url)
const __dirname =path.dirname(_fileName)


export const downloadFile =async(req,res)=>{



    const {fileName}=req.params;

    
    const filePath =path.join(__dirname,'../uploads',fileName)
    console.log(__dirname)


    if(!fs.existsSync(filePath)){
        return res.status(404).json({message:"file not found "})
    }

       res.download(filePath,fileName,(err)=>{
       if(err){
        console.log("error while donwloading",err.message)
        res.status(500).json({message:"error while downloading the file "})
       }else{
         console.log("donwnloaded succesFully")
    }
       })
}