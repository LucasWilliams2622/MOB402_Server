var express = require('express');
// const { render } = require('../app');
var router = express.Router();
const UserController = require('../commponent/user/UserController')
const jwt = require("jsonwebtoken")
const { checkTokenCpanel } = require('../MiddleWare/Authen')
/* GET home page. */

//tao token

//http://localhost:3000/
router.get('/', [checkTokenCpanel], function (req, res, next) {
  res.render('index')
});
//http://localhost:3000/login
router.get('/login', [checkTokenCpanel], function (req, res, next) {

  res.render('user/login')
});
// //http://localhost:3000/Form
// router.get('/Form', function (req, res, next) {
//   res.render('user/Form')
// });
// //http://localhost:3000/Detaila
// router.get('/Detaila', function (req, res, next) {
//   res.render('user/Details')
// });
//http://localhost:3000/cpanel/product
router.get('/product', [checkTokenCpanel], function (req, res, next) {
  res.render('product/Table')
});

// http://localhost:3000/login 
router.post('/login', [checkTokenCpanel], async (req, res, next) => {
  //xỬ lý login
  // nếu login thành công , chuyển qua trang chủ
  //nếu login thất bại, chuyển qua trang login
  const { email, password } = req.body;
  const result = await UserController.login(email, password);
  if (result) {
    //tạo token jwt
    //lưu token vào session
    const token = jwt.sign({ _id: result._id, role: result.role },
      'secret', { expiresIn: 60 * 60 });
    req.session.token = token;
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }

});

// http://localhost:3000/logout /
router.get('/logout', [checkTokenCpanel], function (req, res, next) {
  req.session.destroy();
  res.redirect('login');
});


module.exports = router;


/*
req ,res, next 
req : request
-req.query :query  string
http://localhost:3000/
-req.params ress.body

res :   response
-res.render : trar về trang html WEB
ré.json : trả về json
res.redirect chuyển hướng
res.send trả về file text
res.download tải về file
 */
/*
HTTTP request method
GET  get data from server (read)
POST send data to server (create)

*/
