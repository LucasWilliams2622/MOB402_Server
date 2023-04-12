var express = require('express');
var router = express.Router();


// http://localhost:3000/chuVi?a=2&b=5&c=6

router.post('/', function (req, res, next) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const loaiHinh = req.body.loaiHinh;

  let chuVi = 0;
  switch (loaiHinh.toLowerCase()) {
    case 'hinhtron':
      chuVi = 2 * Math.PI * a;
      break;

    case 'hinhchunhat':
      chuVi = 2 * (a + b);
      break;

    case 'hinhtamgiac':
      chuVi = a + b + c;
      break;

    default:
      dienTich = "Hổng bt nữa hổng bt hình j nữa";
  }

  res.json({ loaiHinh: loaiHinh, chuVi: chuVi });
})

module.exports = router;
