const express = require("express");
const app = express();

// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var serviceAccount = require("./node-firebase-demo-a75c6-firebase-adminsdk-ktiya-105d1b16f2.json");

const firebaseConfig = {
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://node-firebase-demo-a75c6-default-rtdb.firebaseio.com",
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
//let database = firebase.database();
let db = admin.firestore();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//List Users
app.get("/", async (req, res) => {
	let docRef = db.collection("user");
	const users = await docRef.get();
	let usr = [];
	if (users.docs.length > 0) {
		for (const user of users.docs) {
			usr.push(user.data());
		}
	}
	res.json({ users: usr, message: "Users List" });
});

//Add User
app.post("/add", async (req, res) => {
	let docRef = db.collection("user");
	await docRef.add({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
	});
	res.json({ message: "User Added" });
});

//Update User
app.put("/edit/:id", async (req, res) => {
	let docRef = db.collection("user");
	await docRef.doc(req.params.id).update({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
	});
	res.json({ message: "User Updated" });
});

//Delete User
app.delete("/delete/:id", async (req, res) => {
	let docRef = db.collection("user");
	await docRef.doc(req.params.id).delete();
	res.json({ message: "User Deleted" });
});

const server = app.listen(4000, () => {
	console.log(`Server is running on ${server.address().port}`);
});
