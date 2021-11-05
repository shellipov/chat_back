import { users } from "../data/data.js";

class UsersController {
  async getUsers(req, res, next) {
    return res.json(users.map(el => ({id: el.id, username: el.username})));
  }
  async getUsername(req, res, next) {
    const {id} = req.body
    const user = users.filter( el => el.id === id)[0]
    return res.json(user.username);
  }
}
export default new UsersController();
