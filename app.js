const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
    // set return format
    res.setHeader('Content-type', 'application/json');
    
    const url = req.url;
    req.path = url.split("?")[0];

    // deal with blog route
    let blogData = handleBlogRouter(req, res);
    if(blogData){
        res.end(JSON.stringify(blogData));
        return;
    }

    // deal with user route
    let userData = handleUserRouter(req, res);
    if(userData){
        res.end(JSON.stringify(userData));
        return;
    }

    // no route was matched 
    // return 404
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
}

module.exports = serverHandle;