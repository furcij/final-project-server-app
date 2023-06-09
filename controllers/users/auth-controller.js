import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
}

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409); // Send a 409 status code for conflict
    } else {
      const newUser = await usersDao.createUsers(req.body);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    }
  } catch (error) {
    res.sendStatus(409)
  }
};


     
      const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao
          .findUserByCredentials(username, password);
        if (user) {
          req.session["currentUser"] = user;
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      };
     
      const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(404);
          return;
        }
        res.json(currentUser);
      };
     
      const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
      };
     

 const update   = async (req, res) => { };





export default AuthController;