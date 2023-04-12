var express = require('express');
var router = express.Router();

//http://localhost:3000/dienTich/hinhtamgiac?&a=2&b=3&c=2
router.get('/:loaiHinh/', function (req, res, next) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const c = parseFloat(req.query.c);
    const loaiHinh = req.params.loaiHinh;
    let dienTich = 0;

    switch (loaiHinh.toLowerCase()) {
        case 'hinhtron':
            dienTich = (Math.round(((Math.PI * a * a)+Number.EPSILON) * 100) / 100)+"aaa";
            break;

        case 'hinhchunhat':
            dienTich = a * b + "cm2";
            break;

        case 'hinhtamgiac':
            const p = (a + b + c) / 2;
            dienTich = Math.sqrt(p * (p - a) * (p - b) * (p - c)) + "cm2";
            break;

        default:
            dienTich = "Hổng bt nữa hổng bt hình j nữa";
    }

    res.render('Lab/dienTich', { S: dienTich })

})


module.exports = router;
