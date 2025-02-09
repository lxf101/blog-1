const {getList} = require('../controller/blog.js');
const {SuccessModel, ErrorModel} = require('../model/resModel.js');

const handleBlogRouter = (req, res) => {
    const method = req.method;

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
        return {
            msg: "new a blog"
        }
    }

    if(method === 'PUT' && req.path === '/api/blog/update'){
        return {
            msg: "update a blog"
        }
    }

    if(method === 'DELETE' && req.path === '/api/blog/delete'){
        return {
            msg: "delete a blog"
        }
    }
}

module.exports = handleBlogRouter