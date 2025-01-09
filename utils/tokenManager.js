class TokenManager {
  constructor() {
    this.activeTokens = new Set();
  }

  addToken (token) {
    this.activeTokens.add(token);
  }

  removeToken (token) {
    this.activeTokens.delete(token);
  }

  hasToken (token) {
    return this.activeTokens.has(token);
  }

  clearTokens () {
    this.activeTokens.clear();
  }
}

module.exports = new TokenManager();
