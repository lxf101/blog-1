const querystring = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// deal with post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({});
            return;
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        })
        req.on('end', ()=>{
            if(!postData){
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    });
    return promise;
}


const serverHandle = (req, res) => {
    // set return format
    res.setHeader('Content-type', 'application/json');
    
    const url = req.url;
    req.path = url.split("?")[0];
    req.query = querystring.parse(url.split('?')[1]);

    getPostData(req).then(res => {
        req.body = res;

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
    })
}

module.exports = serverHandle;