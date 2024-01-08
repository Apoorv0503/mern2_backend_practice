const {getCurrencies, getCurrenciesWithSymbol} =require("../controllers/currencies.controller");

// Express has a constructor function to initialize a new Router instance
const router=require("express").Router();


//----------------------routes related to currencies-------------------------


// when a user want to make request to this route  , then the actual URL you should give is: http://localhost:8082/currencies/currencies
// first "/currencies" is comming from : app.use("/currencies",currencyRoutes);
//Second "/currencies" is comming from below router(router.get("/currencies",getCurrencies);): so the combination is: "/currencies/currencies"
//So modify the path at here: router.get("/",getCurrencies); now url: http://localhost:8082/currencies

router.get("/",getCurrencies);
router.get("/:symbol",getCurrenciesWithSymbol);

module.exports = router;
