const express=require('express');
const Article=require("../models/article");
//const Article = require('../models/article');

const router=express.Router();
router.post('/',async(req,res)=>{
    try{
    const art1=await Article.find({},null,{sort:{'_id':-1}}).populate("scategorieID");
    res.status(200).json(art1)
}catch (error) {
     res.status(400).json({ message: error.message });
    }
    
});

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
router.get('/art/pagination', async(req, res) => { 
    const page = parseInt(req.query.page); 
    const pageSize = parseInt(req.query.pageSize); 
    // Calculate the start and end indexes for the requested page 
    const startIndex = (page - 1) * pageSize; 
    const endIndex = page * pageSize; 
    const articles = await Article.find().populate("scategorieID").exec() // Slice the products array based on the indexes 
    const paginatedProducts = articles.slice(startIndex, endIndex); 
    // Calculate the total number of pages 
    const totalPages = Math.ceil(articles.length / pageSize); 
    // Send the paginated products and total pages as the API response 
    res.json({ products: paginatedProducts, totalPages }); 
    });
    
    
module.exports=router