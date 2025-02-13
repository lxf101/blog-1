const {exec, escape} = require('../db/mysql');

const getList = (author, keyword) => {
    author = escape(author);
    keyword = escape(keyword);

    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and author=${author} `
    }
    if(keyword){
        sql += `and title like %${keyword}% `
    }
    sql += `order by createtime desc;`

    // return a promise
    return exec(sql);
}

// create new blog
const newBlog = (blogData = {}) => {
    let {content, title, author} = blogData;
    content = escape(content);
    title = escape(title);
    author = escape(author);

    let sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${Date.now()}, ${author})`;
    return exec(sql);
}

const getDetail = (id) => {
    id = escape(id);

    const sql = `select * from blogs where id=${id}`;
    return exec(sql)
}


// update a blog
const updateBlog = (id, blogData = {}) => {
    let {content, title} = blogData;
    content = escape(content);
    title = escape(title);

    let sql = `update blogs set content=${content}, title=${title} where id=${id}`;
    return exec(sql);
}

// delete a blog
const deleteBlog = (id, author) => {
    id = escape(id);
    author = escape(author);

    let sql = `delete from blogs where id=${id} and author=${author}`;
    return exec(sql);
}

module.exports = {
    getList,
    newBlog,
    updateBlog,
    deleteBlog,
    getDetail
}