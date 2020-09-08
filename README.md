## EAT

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas

    id : {type: String, unique: true}, // 아이디
    
    passwd : {type : String}, // 비밀번호

    name : {type : String}, // 이름

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음

* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // 아이디
      
      passwd : {type : String},
      
      token : {type: String}, // 토큰
     } 

    HTTP 404 : { message : "User Not Found!"}

* GET /auto/:token( 자동로그인 )

> Params

    token : { type : String } // 유저 토큰

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // 아이디
      
      passwd : {type : String},
      
      token : {type: String}, // 토큰
     } 

    HTTP 404 : { message : "User Not Found!"}
    


* POST /addFood (음식 추가)

> Params

    foodName : {type: String, required: true} // 음식 이름 (ex. 튼튼밀크)
 
    foodType : {type: String, required: true} // 음식 종류 (ex. 유제품)

    foodDate : {type: Number, required: true} // 유통기한

    nowDate : {type : Number, required: true} // 현재날짜

    userToken : {type: String, required: true} //유저토큰

> Response

    HTTP 200 : { list: 

        foodName : {type: String, required: true} // 음식 이름 (ex. 튼튼밀크)
 
        foodType : {type: String, required: true} // 음식 종류 (ex. 유제품)

        foodDate : {type: Number, required: true} // 유통기한

        nowDate : {type : Number, required: true} // 현재날짜

     } 

    HTTP 500 : { message : "ERR!"}
    



* POST /readFood (음식 읽어오기)

> Params

     userToken :   {type: String} // 유저토큰
    
> Response (ex. NFCtRfG89ei7VYMyM4hsAYp라는 유저토큰을 넣었을때)

    HTTP 200 : { message : "success!"}
    {
        foodName : {type: String} // 음식 이름 (ex. 튼튼밀크)
 
        foodType : {type: String} // 음식 종류 (ex. 유제품)

        foodDate : {type: Number} // 유통기한

        nowDate : {type : Number} // 현재날짜
        
        isExpired : {type : Boolean} // 유통기한 지난음식 (과거)

        token : {type : String} // 현재날짜
    }

    HTTP 500 : { message : "ERR!"}


* POST /finishFood (음식 유통기한 지날 시)

> Params

    userToken :   {type: String, require: true} // 유저토큰

    token :   {type: String, require:true} // 음식토큰
    
> Response 

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}


* POST /delFood (음식 삭제)

> Params

    userToken :   {type: String, require: true} // 유저토큰

    token :   {type: String, require:true} // 음식토큰
    
> Response 

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}

 
* POST /food/search (음식 검색)

> Params

    userToken :   {type: String, require: true} // 유저토큰

    foodName :   {type: String, require:true} // 음식토큰
    
> Response 


    HTTP 200 : { message : "success!"}
    {
        foodName : {type: String} // 음식 이름 (ex. 튼튼밀크)
 
        foodType : {type: String} // 음식 종류 (ex. 유제품)

        foodDate : {type: Number} // 유통기한

        nowDate : {type : Number} // 현재날짜
        
        isExpired : {type : Boolean} // 유통기한 지난음식 (과거)

        token : {type : String} // 현재날짜
    }

    HTTP 500 : { message : "ERR!"}

   


