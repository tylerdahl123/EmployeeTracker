var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Magnolia12",
  database: "Employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrview",
      type: "list",
      message: "Would you like to add an Department, add on a Role(s), or add an Employee? or do you wish to view them?",
      choices: ["department", "roles" ,"employee", "view" , "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrview === "roles") {
        postRoles();
      }
      else if(answer.postOrview === "department") {
        postDepartment();
      } else if (answer.postOrview === "employee") {
          postEmployee();
       } else if (answer.postOrview === "view") {
        viewDepartments();
     }else{
        connection.end();
      }
    });
}

// function to handle posting new items up for auction
function postDepartment() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "Field",
        type: "input",
        message: "What is the Department you would like to add?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.Field,
        },
        function(err) {
          if (err) throw err;
          console.log("Your Department was added!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}
// function to handle posting new items up for auction
function postRoles() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "Roles",
          type: "input",
          message: "What is the Role(s) you would like to add?"
        },
        {
            name: "Pay",
            type: "input",
            message: "What is the positions starting salary?"
        },
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.Roles,
            salary: answer.Pay,

          },
          function(err) {
            if (err) throw err;
            console.log("Your Role was added!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  function postEmployee() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "First",
          type: "input",
          message: "What is the first name of the Employee you would like to add?"
        },
        {
            name: "Last",
            type: "input",
            message: "What is the last name of the Employee you wish to add?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the role of the employee?",
            choices: ["manager"]
        }
      ])
      .then(function(answer) {if (answer.role === "Manager") {
              answer.role = "1"};
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.First,
            last_name: answer.Last,
            role_id: answer.role

          },
          function(err) {
            if (err) throw err;
            console.log("Your Employee was added!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }



  function viewDepartments() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM department", function(err, results) {
      if (err) throw err;})};
    // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
