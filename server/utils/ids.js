function randomId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

module.exports = { randomId };