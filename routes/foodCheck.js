module.exports = foodCheck;


function foodCheck(app, Food, rndstring, schedule){

  app.post('/addFood', async(req,res)=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = yyyy+mm+dd;
    today = parseInt(today);
    var foodDB = new Food(req.body);
    let listNum = await Food.find()
    listNum = listNum.length;
    foodDB.docNum = listNum + 1;
    foodDB.token =  rndstring.generate(23);
    foodDB.nowDate = today;
    var resultCm = await foodDB.save();    
    if(!resultCm.ok) res.status(200).json(foodDB);
    else res.status(500).json({message : "fail!"});
  })

  .post('/readFood', async(req,res)=>{
    let result = await Food.find({userToken : req.body.userToken}).sort({ docNum : -1 });
        let list = [];
        for (var i=0; result[i] != null; i++) {
            let json = {
                foodName: result[i].foodName,
                foodType: result[i].foodType,
                foodDate: result[i].foodDate,
                nowDate : result[i].nowDate,
                isExpired: result[i].isExpired,
                docNum: result[i].docNum,
                token : result[i].token
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
  })

  .post('/finishFood', async(req,res)=>{
    var foodDB = await Food.findOne({userToken : req.body.userToken, token : req.body.token});
    foodDB.isExpired = true;
    try{
      var result = await foodDB.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200).json({message : "success!"});
  })

  .post('/delfood', async(req,res)=>{
    var result = await Food.remove({userToken : req.body.userToken, token: req.body.token})
    var list = await Food.find()
    for ( var i = parseInt(req.body.docNum)+1; i <= list.length+1;i++) {
        let upateResult = await Food.update({ docNum : i }, {
            $set : { docNum : i - 1}
        })
    }
    return res.status(200).json({message : "success!"})
    })

    .post('/food/search', async(req,res)=>{
        let result = await Food.find({foodName : req.body.foodName, userToken : req.body.userToken})
        let list = []
        let foodNum = 1;
        for( var i = 0; result[i] != null; i++) {
            let json = {
                foodName: result[i].foodName,
                foodType: result[i].foodType,
                foodDate: result[i].foodDate,
                nowDate : result[i].nowDate,
                isExpired: result[i].isExpired,
                docNum: foodNum,
                token : result[i].token
            }
            list.push(json)
            foodNum++;
        }
        return res.status(200).json({list : list})
    })


  .get('/readFoodList', (req,res)=>{
  })

}
