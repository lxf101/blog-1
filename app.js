const querystring = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// session data
const SESSION_DATA = {};

// get cookie expire time
const getCookieExpires = () => {
    const t = new Date();
    t.setTime(t.getTime() + (24 * 60 * 60 * 1000));
    return t.toGMTString();
}


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
    // parse query
    req.query = querystring.parse(url.split('?')[1]);

    // parse cookie
    req.cookie = {};
    let cookieData = req.headers.cookie || '';  // k1=v1;k2=v2;k3=v3;
    cookieData.split(';').forEach(item => {
        if(!item){
            return;
        }
        let arr = item.split('=');
        let key = arr[0].trim();
        let value = arr[1];
        req.cookie[key] = value;
    });

    // parse session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {};
        }
    }else{
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];

    getPostData(req).then(resData => {
        req.body = resData;

        // deal with blog route
        let blogResult = handleBlogRouter(req, res);
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCookie){
                    // set cookie
                    res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(blogData));
            });
            return;
        }

        // deal with user route
        let userData = handleUserRouter(req, res);
        if(userData){
            userData.then(data => {
                if(needSetCookie){
                    // set cookie
                    res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(JSON.stringify(data));
            });
            return;
        }

        // no route was matched 
        // return 404
        res.writeHeader(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandle;