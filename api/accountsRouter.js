const express = require('express');
const router = express.Router();
const db = require("../data/dbConfig.js");


//====================
//      CREATE
//====================
router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    const [newAccount] = await db.insert(payload).into("accounts")
		// calling `.first()` is doing the same thing as `.limit(1)` and destructuring the result
    const message = await db.first("*").from("accounts").where("id", newAccount)
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
})



//====================
//      READ
//====================
router.get("/", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "accounts";`
		const accounts = await db.select("*").from("accounts")

		res.json(accounts)
	} catch (err) {
		next(err)
	}
})




module.exports = router;