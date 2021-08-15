const router = require("express").Router();
const db = require("./actions-model");
const { checkActionsPayload, actionIdMustExist} = require("./actions-middlware");
/**
[GET] /api/actions
    Returns an array of actions (or an empty array) as the body of the response.
[GET] /api/actions/:id
    Returns an action with the given id as the body of the response.
    If there is no action with the given id it responds with a status code 404.
[POST] /api/actions
    Returns the newly created action as the body of the response.
    If the request body is missing any of the required fields it responds with a status code 400.
    When adding an action make sure the project_id provided belongs to an existing project.
[PUT] /api/actions/:id
    Returns the updated action as the body of the response.
    If there is no action with the given id it responds with a status code 404.
    If the request body is missing any of the required fields it responds with a status code 400.
[DELETE] /api/actions/:id
    Returns no response body.
    If there is no action with the given id it responds with a status code 404.
 */

router.get("/",async(req,res,next)=>{
    try{
        const actions = await db.get();
        res.status(200).json(actions);
    }
    catch(err){
        next(err);
    }
});
router.get("/:id",actionIdMustExist,async(req,res,next)=>{
    try{
        res.status(200).json(req.action);
    }
    catch(err){
        next(err);
    }
});
router.post("/",checkActionsPayload,async(req,res,next)=>{
    try{
        const newAction = await db.insert(req.body);
        res.status(201).json(newAction);
    }
    catch(err){
        next(err);
    }
})
router.put("/:id",checkActionsPayload,actionIdMustExist,async(req,res,next)=>{
    try{
        const updatedAction = await db.update(req.params.id,req.body);
        if(!updatedAction){
            return next(new Error(`cannot update action with id ${req.params.id}`));
        }
        else{
            res.status(200).json(updatedAction);
        }
    }
    catch(err){
        next(err);
    }
})
router.delete("/:id",actionIdMustExist,async(req,res,next)=>{
    try{
        const counts = await db.remove(req.params.id);
        if(counts === 0){
            return next(new Error(`cannot delete action with id ${req.params.id}`));
        }
        else{
            res.status(200).json(req.action);
        }
    }
    catch(err){
        next(err);
    }
})


module.exports = router;