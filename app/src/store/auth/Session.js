const { randomUUID } = require("crypto");

module.exports = class Session {
  constructor(userId) {
    this.userId = userId;
  }

  generateId() {
    this.id = randomUUID();
  }

  generateTokenId() {
    this.tokenId = randomUUID();
  }

  active() {
    this.isActive = true;
  }

  generateExpiresAt() {
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  start() {
    this.active();
    this.startedAt = new Date();
    this.generateExpiresAt();
  }

  static build(user) {
    const session = new Session(user.id);
    session.generateId();
    session.generateTokenId();
    session.start();
    return session;
  }
};
