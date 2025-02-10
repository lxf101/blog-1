const {login} = require('../controller/user.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

const handleUserRouter = (req, res) => {
    const method = req.method;
    const {username, password} = req.body;

    if(method === 'POST' && req.path === '/api/user/login'){
        let flag = login(username, password);
        if(flag){
            return new SuccessModel();
        }
        return new ErrorModel('Failed login in.');
    }
}

module.exports = handleUserRouter;