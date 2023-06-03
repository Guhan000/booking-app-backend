import express from "express";

const router = express.Router();

router.get("/", (req,res) => {
    res.send("Hello first connection!")
})

export default router;