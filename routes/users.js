import express from "express";
const router=express.Router();
import { deleteUser, getUser, getallUser, updateUser } from "../controllers/userC.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

// check verification
// router.get("/checkverification",verifyToken,(req,res,next)=>{
//     res.send("hello user , you are logged in ")
// });

// //check user
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user , you are logged in and you can now update and delete  your account ")
// });

// //check admin
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello ADMIN , you are logged in and you can now update and delete all account ")
// });

//UPDATE=use PUT
router.put("/:id",verifyUser,updateUser);

//DELETE=use DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET User by id INFO=use GET
router.get("/:id",verifyUser,getUser);

//GET all Users INFO=use GET , only admin can get all the accounts
router.get("/",verifyUser,getallUser);


export default router;