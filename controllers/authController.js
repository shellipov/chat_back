import { users } from "../data/data.js";

class AuthController {
  async login(req, res, next) {
    const { username, password } = req.body;
    const user = users.filter((el) => el.username === username)[0];
    if (user && user.password === password) {
      return res.json({
        auth: true,
        user: { username: user.username, id: user.id },
      });
    } else {
      return res.json({ error: "Неверный логин или пароль" });
    }
  }
}

export default new AuthController();
