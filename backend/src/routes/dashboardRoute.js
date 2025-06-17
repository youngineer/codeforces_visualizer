const express = require("express");
const { fetchAllUsers } = require("../middlewares/fetchData");
const dashboardRoute = express.Router();


dashboardRoute.get("/", fetchAllUsers, async(req, resp) => {
    try{
        const userList = req.userList;
    
    } catch(err) {
        resp.status(400).json({
            message: "No userList retrieved: " + err.message,
            data: null
        });
    }
});


module.exports = {
    dashboardRoute
}