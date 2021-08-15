const projects = require("./projects-model");
const checkProjectPayload=(req,res,next)=>{
    try{
        const {name,description,completed} = req.body;
        if(typeof(name)!=="string" || name.length === 0){
            return res.status(400).json({message:"name is missing"});
        }
        if(typeof(description)!=="string"|| description.length === 0){
            return res.status(400).json({message:"description is missing"});
        }
        if(typeof(completed)!=="boolean"){
            return res.status(400).json({message:"completed must be a boolean"});
        }
        next();
    }
    catch(err){
        next(err);
    }
};
const projectIdMustExist = async(req,res,next) => {
    try{
        const project = await projects.get(req.params.id);
        if(!project){
            return res.status(404).json({message:`project with id ${req.params.id} does not exist`});
        }
        else{
            req.project = project;
            next();
        }
    }
    catch(err){

    }
}
module.exports = {
    checkProjectPayload,
    projectIdMustExist
};