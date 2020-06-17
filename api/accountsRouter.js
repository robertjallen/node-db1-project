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

// GET BY ID

router.get("/:id", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "messages" WHERE "id" = ? LIMIT 1;`
		// descructure the result since we only care about the first index of the array
		const [account] = await db
			.select("*")
			.from("accounts")
			.where("id", req.params.id)
			// make sure we're only getting a single result,
			// since we're destructuring the array above
			.limit(1)

		res.json(account)
	} catch (err) {
		next(err)
	}
})
//====================
//      UPDATE
//====================
router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
		}

		// translates to `UPDATE "messages" SET ? = ? WHERE "id" = ?;`
		await db("accounts").update(payload).where("id", req.params.id)
		const message = await db.first("*").from("accounts").where("id", req.params.id)

		res.json(message)
	} catch (err) {
		next(err)
	}
})



module.exports = router;