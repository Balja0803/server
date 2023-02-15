const { response } = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 2020;
app.use(cors());
app.use(bodyParser.json());

app.get("/products", (request, response) => {
  console.log("GET products huselt orj irlee");
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(404).send({ message: err });
    } else {
      response.status(200).send(data);
    }
  });
});
// app.get("/users", (request, response) => {
//   console.log("GET users huselt orj irlee");
//   fs.readFile("./data/users.json", (err, data) => {
//     if (err) {
//       response.status(404).send({ message: err });
//     } else {
//       response.status(200).send(JSON.parse(data));
//     }
//   });
// });

app.post("/users/login", (request, response) => {
  const { username } = request.params;
  const { password } = request.params;
  console.log("user LOGIN huselt orj irlee", request.body);
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      response.status(404).send({ message: err });
    } else {
      const users = JSON.parse(data);
      const isValidUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!isValidUser) {
        response.status(409).send({ message: "not valid!" });
      } else {
        response.status(200).send({ message: "valid!" });
      }
    }
  });
});

// app.post("/users/add", (request, response) => {
//   console.log("users POST huselt irlee", request.body);
//   fs.readFile("./data/users.json", (err, data) => {
//     if (err) {
//       response.status(500).send({ message: err });
//     } else  {
//       const users = JSON.parse(data);
//       users.push(request.body);
//       fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
//         if (err) {
//           response.status(500).send({ message: err });
//         } else {
//           response.status(200).send({ message: "user added successfully" });
//         }
//       });
//     }
//   });
// });
app.post("/users/add", (request, response) => {
  console.log("users POST huselt irlee", request.body);
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const users = JSON.parse(data);

      const foundUser = users.find(
        (user) =>
          user.username === request.body.username ||
          user.email === request.body.email
      );

      if (!foundUser) {
        users.push(request.body);
        fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
          if (err) {
            response.status(500).send({ message: err });
          } else {
            response.status(200).send({ message: "user added successfully" });
            console.log("user nemeglee");
          }
        });
      } else {
        response
          .status(409)
          .send({ message: "username or email already exists" });
        console.log(
          "Denied ! username or email already exist, username:",
          request.body.username
        );
      }
    }
  });
});

app.post("/products/add", (request, response) => {
  console.log("product POST huselt orj irlee :", request.body);
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      products.push(request.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ message: "product added successfully" });
        }
      });
    }
  });
});

app.delete("/products/delete/:id", (request, response) => {
  const { id } = request.params;
  console.log(id, " tai Delete huselt irlee");
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const datas = JSON.parse(data);
      const leftDatas = datas.filter((data) => data.id !== id);
      fs.writeFile("./data/products.json", JSON.stringify(leftDatas), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ message: "successfully deleted" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server is starting in ${port} port`);
});
