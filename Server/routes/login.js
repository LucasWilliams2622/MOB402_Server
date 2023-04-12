var express = require('express');
var router = express.Router();
const UserController = require('../commponent/user/UserController')
const jwt = require("jsonwebtoken")

const {checkTokenCpanel} = require('../MiddleWare/Authen')

//http://localhost:3000/login
router.get('/',[checkTokenCpanel], function (req, res, next) {
  res.render('user/login');
  console.log("aaaaaaaaaaaaaaaaaaaaaaa");
});
//http://localhost:3000/cpanel/product
router.get('/product', [checkTokenCpanel],function (req, res, next) {
  res.render('product/Table')
});
// http://localhost:3000/login /
router.post('/login',[checkTokenCpanel], async (req, res, next) =>{
  //xỬ lý login
  // nếu login thành công , chuyển qua trang chủ
  //nếu login thất bại, chuyển qua trang login
  const {email,password} = req.body;
  const result = await userController.login(email,password);
  if(result){
    //tạo token jwt
    //lưu token vào session
    const token = jwt.sign({id:1, name:'An'}, 'secret', {expiresIn: '1h'});
    req.session.token = token;

    
    return res.redirect('/');
  }else{
    return res.redirect('/login');
  }
  
 });
module.exports = router;
