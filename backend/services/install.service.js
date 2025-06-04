// Import the query function from the db.config.js file
const { rejects } = require("assert");
const connection = require("../config/db.config");

// Import the fs module to read our sql file
const fs = require("fs");

// Write a function to create the database tables
async function install() {
  // Create a variable to hold the path to the sql file
  const queryfile = __dirname + "/sql/initial-queries.sql";

  // console.log(queryfile);

  // Temporary variable, used to store all queries, the return message and the current query
  let queries = [];
  let finalMessage = {};
  let templine = "";

  // Read the sql file
  // const lines = await fs.readFileSync(queryfile, "utf-8").split("\n");

  const fileContent = fs.readFileSync(queryfile, "utf-8");
  const lines = fileContent.split("\n");
  // console.log("File path:", queryfile);
  console.log("Tables Are About to be Created ...");

  // console.log(lines);

  // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables
  const executed = await new Promise((resolve, rejects) => {
    // Iterate over all lines
    lines.forEach((line) => {
      // console.log(line);

      //   // If the line is a  comment or empty line, Skip it
      if (line.trim().startsWith("--") || line.trim() === "") {
        return;
      }

      templine += line;

      // If it has a semicolon at the end, it's the end of the query
      if (line.trim().endsWith(";")) {
        // prepare the individual query
        const sqlQuery = templine.trim();
        // console.log(sqlQuery);

        queries.push(sqlQuery);
        templine = "";
        // console.log(templine);
      }
    });
    resolve("Queries are added to the list");
    // console.log(queries);
  });

  //Loop through the queries and execute them one by one asynchronously
  for (let i = 0; i < queries.length; i++) {
    try {
      const result = await connection.query(queries[i]);

      console.log("Table created");
    } catch (error) {
      console.log(error);

      // console.log("Err Occurred - Table not created");
      finalMessage.message = "Not all tables are created";
    }
  }

  // prepare the final message to return to the controller
  if (!finalMessage.message) {
    finalMessage.message = " ALl tables are created";
    finalMessage.status = 200;
    // console.log("kkk");
  } else {
    finalMessage.status = 500;
    // console.log("555");
  }

  // Return the final message
  return finalMessage;
}

// install();

// export the insatll function for the use in the controller
module.exports = { install };
