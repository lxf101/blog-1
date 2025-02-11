const {login} = require('../controller/user.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

const handleUserRouter = (req, res) => {
    const method = req.method;
    const {username, password} = req.body;

    if(method === 'POST' && req.path === '/api/user/login'){
        let loginResult = login(username, password);
        if(loginResult){
            return loginResult.then(loginData => {
                if(loginData.username){
                    return new SuccessModel();
                }else{
                    return new ErrorModel('Failed login in.');
                }
            })
        }
    }
}

module.exports = handleUserRouter;