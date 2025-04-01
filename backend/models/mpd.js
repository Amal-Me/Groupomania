//mysql pour les interactions avec la BDD
const mysql = require("mysql");
require('dotenv').config();
const password = process.env.DB_PASSWORD;
var db = "";

const sqlRole =
  "CREATE TABLE IF NOT EXISTS Role" +
  "(RoleId INT NOT NULL AUTO_INCREMENT," +
  "Title VARCHAR(100) NOT NULL," +
  "PRIMARY KEY (RoleId))";

const sqlUser =
  "CREATE TABLE IF NOT EXISTS User" +
  "(UserId INT NOT NULL AUTO_INCREMENT," +
  "Pseudo VARCHAR(20)," +
  "Email VARCHAR(100) NOT NULL UNIQUE," +
  "Password VARCHAR(100) NOT NULL," +
  "Name VARCHAR(100) ," +
  "FirstName VARCHAR(100) ," +
  "DateOfBirth VARCHAR(100) ," +
  "Phone INT ," +
  "Job VARCHAR(100) ," +
  "ImageUrl VARCHAR(500) ," +
  "Role_Id INT," +
  "PRIMARY KEY (UserId)," +
  "FOREIGN KEY (Role_Id) REFERENCES Role(RoleId))";

const sqlForum =
  "CREATE TABLE IF NOT EXISTS Forum" +
  "(ForumId INT NOT NULL AUTO_INCREMENT," +
  "Title VARCHAR(100) NOT NULL UNIQUE," +
  "Description VARCHAR(500)," +
  "User_Id INT," +
  "PRIMARY KEY (ForumId)," +
  "FOREIGN KEY (User_Id) REFERENCES User(UserId))";

const sqlPublication =
  "CREATE TABLE IF NOT EXISTS Publication" +
  "(PublicationId INT NOT NULL AUTO_INCREMENT," +
  "Temps DATETIME ," +
  "Content VARCHAR(100) NOT NULL ," +
  "ImageUrl VARCHAR(500) ," +
  "User_Id INT NOT NULL," +
  "Forum_Id INT NOT NULL," +
  "PRIMARY KEY (PublicationId)," +
  "FOREIGN KEY (Forum_Id) REFERENCES Forum(ForumId)," +
  "FOREIGN KEY (User_Id) REFERENCES User(UserId) ON DELETE CASCADE)";

const sqlComment =
  "CREATE TABLE IF NOT EXISTS Comment" +
  "(CommentId INT NOT NULL AUTO_INCREMENT," +
  "Temps DATETIME ," +
  "Content VARCHAR(100) NOT NULL ," +
  "ImageUrl VARCHAR(500) ," +
  "Publication_Id INT," +
  "User_Id INT," +
  "PRIMARY KEY (CommentId)," +
  "FOREIGN KEY (Publication_Id) REFERENCES Publication(PublicationId) ON DELETE CASCADE," +
  "FOREIGN KEY (User_Id) REFERENCES User(UserId) ON DELETE CASCADE)";

const sqlLikePub =
  "CREATE TABLE IF NOT EXISTS LikePub" +
  "(Publication_Id INT NOT NULL," +
  "User_Id INT NOT NULL," +
  "FOREIGN KEY (Publication_Id) REFERENCES Publication(PublicationId) ON DELETE CASCADE," +
  "FOREIGN KEY (User_Id) REFERENCES User(UserId) ON DELETE CASCADE," +
  "PRIMARY KEY (Publication_Id, User_Id))";

const sqlConnection =
  "CREATE TABLE IF NOT EXISTS Connection" +
  "(Forum_Id INT NOT NULL," +
  "User_Id INT NOT NULL," +
  "FOREIGN KEY (Forum_Id) REFERENCES Forum(ForumId)," +
  "FOREIGN KEY (User_Id) REFERENCES User(UserId) ON DELETE CASCADE," +
  "PRIMARY KEY (Forum_Id, User_Id))";

const sqlInsRole =
  "INSERT INTO Role (Title) VALUES ('Admin'), ('User'), ('Reader') ON DUPLICATE KEY UPDATE Title = Title";

const sqlInsForum =
  "INSERT INTO Forum (Title) VALUES ('forumPrincipal') ON DUPLICATE KEY UPDATE Title = Title";

db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "groupomania",
  multipleStatements: true,  
});
db.connect( (err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  
  db.query("CREATE DATABASE IF NOT EXISTS groupomania", (err, result) => {
    if (err) throw err;
    console.log("Base de données créée !");
  });
  db.query("use groupomania", (err, result) => {
    if (err) throw err;
    console.log("Connecté à groupomania!");
  });
  db.query(
    {
      sql: `${sqlRole};  ${sqlUser};  ${sqlForum};  ${sqlPublication};
    ${sqlLikePub};  ${sqlComment};  ${sqlLikePub};  ${sqlConnection};
    ${sqlInsRole};  ${sqlInsForum}  `,
      timeout: 1000,
    },
    (err, res) => {
      if (err) throw err;
      console.log("Création des TABLES et INSTANCES");
    }
  );
});



module.exports = db;
