const { firstTest } = require("./first-test");

(async function() {
  try {
    await firstTest();
  } catch (e) {
    console.log(e)
  }
  
})();