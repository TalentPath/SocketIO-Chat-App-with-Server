var stocks = [
    {"name": "DJIA", "country": "US","value": 16412.71, "status":"down"},
    {"name": "TSX", "country": "CA","value": 14393.1, "status":"down"},
    {"name": "CAC 40", "country": "FR","value": 4484.55, "status":"up"},
    {"name": "DAX", "country": "DE","value": 9695.77, "status":"up"},
    {"name": "AEX", "country": "NL","value": 407.46, "status":"up"},
    {"name": "IPC", "country": "IT","value": 40598.34, "status":"up"},
    {"name": "Shanghai", "country": "CN","value": 2058.83, "status":"up"},
    {"name": "Sensex", "country": "IN","value": 22359.5, "status":"up"},
    {"name": "Nikkei", "country": "JP","value": 15063.77, "status":"up"}
];
var counter = 0;

var stockwatch = module.exports = function(){
    console.log('stockwatch was instantiated');
}


stockwatch.prototype.generateStocks = function(){
    counter++;
    if(counter==1){
        return stocks;
    }else{

        for(var i=0;i<stocks.length;i++){
            var val = Math.random() * 80.24;
            var plusMinus = Math.random() < 0.5 ? -1 : 1;

            stocks[i]["value"] = stocks[i]["value"] + (val*plusMinus);
            if(plusMinus==-1) {
                stocks[i]["status"] = "down";
            }else{
                stocks[i]["status"] = "up";
            }
        }
        return stocks;
    }
}