const config = {
    "mongo_instances": {
        "primary_1": {
            "connect": true,
            "db": "skillg",
            "host": "skillg.ly2z6.mongodb.net",
            "user": "skillg",
            "pass": "skillg1234",
            "options": "?retryWrites=true&w=majority&appName=skillg",
            "uri":process.env.MONGODB_URI
        }
    },
    "application": {
        "port": process.env.PORT
    },
    "jwt": {
        "secretKey": process.env.SECRET_KEY
    },
    "admin": {
        "email": process.env.ADMIN_EMAIL,
        "password": process.env.ADMIN_PASSWORD
    }
};

module.exports = config