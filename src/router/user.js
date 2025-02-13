const {login} = require('../controller/user.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');
const {setRedis} = require('../db/redis.js')


const handleUserRouter = (req, res) => {
    const method = req.method;
    const {username, password} = req.body;

    if(method === 'POST' && req.path === '/api/user/login'){
        let loginResult = login(username, password);
        if(loginResult){
            return loginResult.then(loginData => {
                if(loginData.username){
                    // set session
                    req.session.username = loginData.username;
                    req.session.realname = loginData.realname;
                    // synchronize redis
                    setRedis(req.sessionId, req.session);
                    return new SuccessModel();
                }else{
                    return new ErrorModel('Failed login in.');
                }
            })
        }
    }
}

module.exports = handleUserRouter;