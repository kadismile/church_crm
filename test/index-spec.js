const { churchTest } = require("./church-test.js");

(async function() {
  try {
    await churchTest();
  } catch (e) {
    console.log(e)
  }
  
})();