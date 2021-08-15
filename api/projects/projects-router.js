const router = require("express").Router();
const projectsModel = require("./projects-model");
const {projectIdMustExist,checkProjectPayload} = require("./projects-middleware");
/*
[GET] /api/projects
    Returns an array of projects as the body of the response.
    If there are no projects it responds with an empty array.
[GET] /api/projects/:id
    Returns a project with the given id as the body of the response.
    If there is no project with the given id it responds with a status code 404.
[POST] /api/projects
    Returns the newly created project as the body of the response.
    If the request body is missing any of the required fields it responds with a status code 400.
[PUT] /api/projects/:id
    Returns the updated project as the body of the response.
    If there is no project with the given id it responds with a status code 404.
    If the request body is missing any of the required fields it responds with a status code 400.
[DELETE] /api/projects/:id
    Returns no response body.
    If there is no project with the given id it responds with a status code 404.
[GET] /api/projects/:id/actions
    Returns an array of actions (could be empty) belonging to a project with the given id.
    If there is no project with the given id it responds with a status code 404.
*/
router.get("/",(req,res,next)=>{
    try{
        const projects = await projectsModel.get();
        res.status(200).json(projects);
    }
    catch(err){
        next(err);
    }
});
router.get("/:id",projectIdMustExist,(req,res,next)=>{
    try{
        res.status(200).json(req.project);
    }
    catch(err){
        next(err);
    }
});
router.post("/",checkProjectPayload,async(req,res,next)=>{
    try{
        const newProject = await projectsModel.insert(req.body);
        res.status(201).json(newProject);
    }
    catch(err){
        next(err);
    }
});
router.put("/:id",checkProjectPayload,projectIdMustExist,async(req,res,next)=>{
    try{
        const updatedProject = await projectsModel.update(req.params.id,req.body);
        res.status(200).json(updatedProject);
    }
    catch(err){
        next(err);
    }
});
router.delete("/:id",projectIdMustExist,async(req,res,next)=>{
    try{
        const counts = await projectsModel.remove(req.params.id);
        if(counts===0){
            next(new Error(`project with id ${req.params.id} cannot be deleted`));
        }
        else{
            res.status(200).json(req.project);
        }
    }
    catch(err){
        next(err);
    }
});
router.get("/:id/actions",projectIdMustExist,async(req,res,next)=>{
    try{
        const actions = await projectsModel.getProjectActions(req.params.id);
        res.status(200).json(actions);
    }
    catch(err){
        next(err);
    }
});
module.exports = router;