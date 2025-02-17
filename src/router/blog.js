const {getList, newBlog, updateBlog, deleteBlog, getDetail} = require('../controller/blog.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

// unified login authentication function
const loginCheck = (req) => {
    console.log('=====loginCheck====req====', req.session);
    if(req.session.username){
        return true;
    }else{
        return false;
    }
}


const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // get blog list interface
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        let keyword = req.query.keyword || '';

        if(req.query.isadmin){
            console.log('==========isadmin=========');
            // admin page
            let loginCheckResult = loginCheck(req);
            console.log('======loginCheckResult========', loginCheckResult);
            if(!loginCheckResult){
                return new ErrorModel('Not login in.'); 
            }
            // force to get admin blog
            author = req.session.realname;
        }
        
        let result = getList(author, keyword);
        return result.then(resData => {
            return new SuccessModel(resData);
        });
    }

    if(method === 'GET' && req.path === '/api/blog/detail'){
        let result = getDetail(id);
        if(result){
            return result.then(resultData => {
                return new SuccessModel(resultData[0]);
            });
        }
    }

    if(method === 'POST' && req.path === '/api/blog/new'){
        let loginCheckResult = loginCheck(req);
        if(!loginCheckResult){
            return new ErrorModel('Not login in.');
        }

        req.body.author = req.session.realname;
        let blogData = newBlog(req.body);
        if(blogData){
            return blogData.then(resData => {
                return new SuccessModel({id: resData.insertId});
            });
        }
    }

    if(method === 'POST' && req.path === '/api/blog/update'){
        let loginCheckResult = loginCheck(req);
        if(!loginCheckResult){
            return new ErrorModel('Not login in.');
        }

        let updateData = updateBlog(id, req.body);
        if(updateData){
            return updateData.then(resData => {
                if(resData.affectedRows > 0){
                    return new SuccessModel(true);
                }else{
                    return new ErrorModel('Fail to update the blog.');
                }
            })
        }
    }

    if(method === 'POST' && req.path === '/api/blog/delete'){
        let loginCheckResult = loginCheck(req);
        if(!loginCheckResult){
            return new ErrorModel('Not login in.');
        }
        let author = req.session.realname;
        let delData = deleteBlog(id, author);
        if(delData){
            return delData.then(resData => {
                if(resData.affectedRows > 0){
                    return new SuccessModel(true);
                }else{
                    return new ErrorModel('Fail to delete the blog.');
                }
            })
        }
    }
}

module.exports = handleBlogRouter