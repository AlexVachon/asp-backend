const { User, validatePassword } = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const UserService = {
  async userExists(email) {
    try {
      const user = User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  },
  async registerUser(first_name, last_name, email, password) {
    try {
      const user = await User.create({
        first_name,
        last_name,
        email,
        password,
      });

      return user;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  },
  async findUserById(id) {
    try {
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      console.error("Erreur lors de la rechercher de l'utilisateur:", error);
    }
  },
  async loginUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error("Vérifier l'adresse e-mail saisie");

      const isValid = await validatePassword(password, user.password);

      if (!isValid) throw new Error("Mot de passe incorrect!");

      const token = jwt.sign(
        {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return { user, token };
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur:", error);
      throw error;
    }
  },
};

module.exports = UserService;
