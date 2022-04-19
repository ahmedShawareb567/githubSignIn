const { SOCIAL_LOGIN_OR_REGISTER } = require("../graphql/auth");
const axios = require("axios");

const api = axios.create({
  baseURL: `${process.env.API_BASE}`,
});

const login = async (payload) => {
  try {
    const {
      data: {
        data: { socialLoginOrRegister },
      },
    } = await api.post("/graphql", {
      query: SOCIAL_LOGIN_OR_REGISTER,
      variables: {
        input: payload,
      },
    });

    return socialLoginOrRegister;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  async authCallback(req, res) {
    try {
      const props = req.user;

      const loginReq = await login(props);

      if (loginReq.token) {
        res.cookie("token", loginReq.token);
      }

      return res.redirect("/profile");
    } catch (e) {
      console.log(e);
    }
  },
};
