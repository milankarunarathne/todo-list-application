
const constants = require('../constants')

class TodoDb {
    constructor (dbConn) {
        this.__dbConn = dbConn
    }

    async saveSingleTodo ( todo ) {
        try {
            const result = await this.__dbConn.collection(constants.COLLECTION_NAMES.TODO)
                .insertOne (todo)

            if ( result ) {
                return result
            }

        } catch (e) {
            if ( e.code != '11000') {
                throw e
            }
        }
        return null
    }
}

module.exports = TodoDb