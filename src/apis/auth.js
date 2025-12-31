const { fetcher } = require("./fetcher")

const path = {
    login : '/auth/login',
}

const loginApi = (body) => {
    return fetcher({
        method: 'POST',
        url: path.login,
        data: body
    })
}

export {loginApi}