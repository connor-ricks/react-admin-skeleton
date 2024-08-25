import 'server-only';

const credentials = {
  username: 'password',
};

var refreshTokens = {};

export function validateCredentials(username, password) {
  return credentials[username] && credentials.username === password;
}

export function validateRefreshToken(username, token) {
  return refreshTokens[username] === token;
}

export function assignRefreshToken(username, token) {
  refreshTokens[username] = token;
}

export function unassignRefreshToken(username) {
  refreshTokens[username] = null;
}
