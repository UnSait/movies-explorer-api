const INTERNAL_SERVER_ERROR = 500;

const LINK = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

module.exports = {
  INTERNAL_SERVER_ERROR,
  LINK,
};
