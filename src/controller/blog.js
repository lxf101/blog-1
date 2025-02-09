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

module.exports = {
    getList
}