module.exports = {
  SOCIAL_LOGIN_OR_REGISTER: `
  mutation socialLoginOrRegister($input: SocialAccountInput!) {
    socialLoginOrRegister(input: $input) {
      id
      userName
      email
      profilePicture
      token
    }
  }
  `,
};
