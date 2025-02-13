const {exec, escape} = require('../db/mysql');

const login = (username, password) => {
    username = escape(username);
    password = escape(password);

    let sql = `select username, realname from users where username=${username} and password=${password}`;
    return exec(sql).then(resData => {
        return resData[0] || {}
    })
}

module.exports = {
    login
}