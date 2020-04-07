module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || 'mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority', //  para base se datos local 'mongodb://localhost:27017/portafolio'
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'secretkey'
}