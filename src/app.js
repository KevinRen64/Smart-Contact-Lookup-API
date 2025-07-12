// Import the mysql2 library with promise support to interact with MySQL databases
const mysql = require('mysql2/promise');

// Configuration object to hold database connection details
// These are read from environment variables for security
const config = {
  host: process.env.DB_HOST,  // RDS endpoint, e.g., 'mydb.xxxxx.us-east-1.rds.amazonaws.com'
  user: process.env.DB_USER,  // Database username, e.g., 'admin'
  password: process.env.DB_PASSWORD,   // Database password
  database: process.env.DB_NAME,  // The specific database to connect to, e.g., 'TutorialAppDB'
};

// Main Lambda handler function, triggered by AWS Lambda on invocation
exports.handler = async (event) => {
  let connection;  // Variable to hold the database connection object
  const contactId = event.pathParameters?.id;

  if (!contactId || isNaN(contactId)) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid or missing contact ID' }),
    };
  }

  try {
    // Connect to MySQL using the config
    connection = await mysql.createConnection(config);
    // Query the contact from the 'contacts' table
    const [rows] = await connection.execute("SELECT * FROM contacts WHERE id = ?", [contactId]);

    if (rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Contact not found' }),
      };
    }

    return {
      statusCode: 200,  
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(rows[0]),  
    };
  } catch (err) {
    // If any error occurs (e.g., connection failure, query error), log it for debugging
    console.error('Database error', err);
    
    // Return an HTTP 500 error response indicating a server/database issue
    return {
      statusCode: 500,  // HTTP status code for server error
      body: JSON.stringify({ error: 'Database connection failed' }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
