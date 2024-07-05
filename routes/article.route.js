const express=require('express');
const Article=require("../models/article");
//const Article = require('../models/article');

const router=express.Router();

router.get('/',async(req,res)=>{
    try{
    const art1=await Article.find({},null,{sort:{'_id':-1}}).populate("scategorieID");
    res.status(200).json(art1)
}catch (error) {
     res.status(400).json({ message: error.message });
    }
    
});
router.delete('/:id',async(req,res)=>{
    try {
    await Article.findByIdAndDelete(req.params.articleId);
    res.status(200).json({ message:"sous article deleted succesfully "});
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})

router.put('/:id',async(req,res)=>{
    try{
    const findsArticle=await Article.findByIdAndUpdate(req.params.articleid,
        {$set:req.body},
    {new:true}
);
res.status(200).json(findsArticle) 
}catch(error){
    res.status(400).json({ message: error.message });
    
}
});
module.exports=router