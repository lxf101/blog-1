const {getList, newBlog, updateBlog, deleteBlog} = require('../controller/blog.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // get blog list interface
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || '';
        let keyword = req.query.keyword || '';

        let blogList = getList(author, keyword);
        return new SuccessModel(blogList);
    }

    if(method === 'GET' && req.path === '/api/blog/detail'){
        return {
            msg: "get blog detail"
        }
    }

    if(method === 'POST' && req.path === '/api/blog/new'){
        let blogData = newBlog(req.body);
        return new SuccessModel(blogData);
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