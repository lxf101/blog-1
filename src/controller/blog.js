const {exec} = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // return a promise
    return exec(sql);
}

// create new blog
const newBlog = (blogData = {}) => {
    let {content, title, author} = blogData;
    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${Date.now()}', '${author}')`;
    return exec(sql);
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql)
}


// update a blog
const updateBlog = (id, blogData = {}) => {
    return true;
}

// delete a blog
const deleteBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    newBlog,
    updateBlog,
    deleteBlog,
    getDetail
}