const express = require("express");
const emp = require("../models/schema");

async function handleGetUsers(req,res) {
    const data =  await emp.find();
    const html = `
        <ul>
            ${data.map((user)=>`<li>${user.firstName} : ${user.email}</li>`).join("")}
        </ul>
   `;
   res.send(html);
}

async function handleCreateNewUsers(req,res){
    const data = req.body;

    console.log(data);

    if(
        !data ||
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.gender ||
        !data.jobTitle
    ){
        return res
        .status(400)
        .json({msg:"All Fields Required!"});
    }

    const result = await emp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        jobTitle: data.jobTitle
    })

    if(result){
        return res
        .status(200)
        .json({msg:"Employee Created!"});
    }
}

async function handleGetUserById(req,res){

    const data =  await emp.findById(req.params.id);
    if(!data){
        return res
        .status(404)
        .json({msg : "Employee Not Found!"})
        .send("Employee not Found!");
    }
    const html= `
        <ul>
            ${data.firstName} : ${data.email}
        </ul>
    `;
    return res.send(html);

}

async function handleUpdateUserById(req,res){
    try{
        const updateData = req.body;
        const updatedEmp =  await emp.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(updatedEmp){
            return res
            .status(200)
            .json({msg:"Success!"});
        }
        else{
            return res
            .status(404)
            .json({msg:"User not found!"});
        }
    }catch(err){
        console.log(err);
    }
}

async function handleDeleteUserById(req,res){
    try{
        const data = await emp.findByIdAndDelete(req.params.id);
        if(data){
            return res
            .status(200)
            .json({msg:"Success!"});
        }
        else{
            return res
            .status(404)
            .json({msg:"User not found!"});
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    handleGetUsers,
    handleCreateNewUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}