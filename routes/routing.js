const express = require("express");
const { 
    handleGetUsers, 
    handleCreateNewUsers, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById 
} = require("../controllers/controls");

const router = express.Router();

router.route("/")
.get(handleGetUsers)
.post(handleCreateNewUsers);

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;