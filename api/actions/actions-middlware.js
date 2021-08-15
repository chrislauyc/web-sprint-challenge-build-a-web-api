const projectsModel = require("../projects/projects-model");
const actionsModel = require("./actions-model");
const checkActionsPayload=async(req,res,next)=>{
    try{
        const {project_id,description,notes,completed} = req.body;
        if(
            project_id===undefined ||
            description===undefined ||
            notes===undefined){
                return res.status(400).json({message:"missing required field(s)"});
        }
        if(completed===undefined){
            req.body.completed = false;
        }
        if(typeof(project_id)!=="number"){
            return res.status(400).json({message:"project_id must be a number"});
        }
        const project = await projectsModel.get(project_id);
        if(project===undefined){
            return res.status(400).json({message:"project_id does not exist"});
        }
        if(typeof(description)!=="string"||description.length > 128){
            return res.status(400).json({message:"description must a string up to 128 long"});
        }
        if(typeof(notes)!=="string"){
            return res.status(400).json({message:"note must be a string"});
        }
        if(typeof(req.body.completed)!=="boolean"){
            return res.status(400).json({message:"completed must be a boolean"});
        }
        next()
    }
    catch(err){
        next(err);
    }
};
const actionIdMustExist=async(req,res,next)=>{
    try{
        const action = await actionsModel.get(req.params.id);
        if(!action){
            return res.status(404).json({message:`action with ${req.params.id} does not exist`});
        }
        else{
            req.action = action;
            next();
        }
    }
    catch(err){
        next(err);
    }
};
// const idMustNotExist=async(req,res,next)=>{
//     try{
//         const action = await db.get(req.params.id);
//         if(action){
//             return res.status(400).json({message:``})
//         }
//     }
//     catch(err){
//         next(err);
//     }
// };
module.exports = {
    checkActionsPayload,
    actionIdMustExist
}