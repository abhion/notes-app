const auth = (req, res, next) => {
    const key = req.headers['key'];
    if(key === 'secret123'){
        req.msg = 'welcome';
        next();
    }else{
        res.json({error: "invalid key"});
    }

};

module.exports = auth;