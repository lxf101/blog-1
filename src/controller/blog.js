const getList = (author, keyword) => {
    // return mock data
    return [
        {
            id: 1,
            title: 'title_01',
            content: 'content_01',
            createTime: 1739003048092,
            author: 'lxf01'
        },
        {
            id: 2,
            title: 'title_02',
            content: 'content_02',
            createTime: 1739003634799,
            author: 'eric'
        }
    ]
}

// create new blog
const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
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
    deleteBlog
}