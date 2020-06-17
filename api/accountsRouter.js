const express = require('express');
const router = express.Router();
const db = require("../data/dbConfig.js");

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