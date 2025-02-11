const {getList, newBlog, updateBlog, deleteBlog, getDetail} = require('../controller/blog.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // get blog list interface
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        let keyword = req.query.keyword || '';

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
        req.body.author = 'zhangsan';
        let blogData = newBlog(req.body);
        if(blogData){
            return blogData.then(resData => {
                return new SuccessModel({id: resData.insertId});
            });
        }
    }

    if(method === 'PUT' && req.path === '/api/blog/update'){
        let flag = updateBlog(id, req.body);
        if(flag){
            return new SuccessModel();
        }else{
            return new ErrorModel('Fail to update the blog.');
        }
    }

    if(method === 'DELETE' && req.path === '/api/blog/delete'){
        let flag = deleteBlog(id);
        if(flag){
            return new SuccessModel();
        }else{
            return new ErrorModel('Fail to delete the blog.');
        }
    }
}

module.exports = handleBlogRouter