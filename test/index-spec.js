import { firstTest } from "./first-test";


(async function() {
  try {
    console.log("we got in here ____")
    await firstTest();
  } catch (e) {
    console.log(e)
  }
  
})();