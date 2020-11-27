const _ = require('lodash')
const { ObjectID } = require('mongodb')
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

    async getAllTodos () {
     
        const result = await this.__dbConn.collection(constants.COLLECTION_NAMES.TODO)
            .find().toArray()

        if (_.size(result) > 0) {
            return result
        }

        return []

    }

    async deleteOneTodo(id) {
        const result = await this.__dbConn.collection(constants.COLLECTION_NAMES.TODO)
            .deleteOne({ _id: ObjectID(id)})

        if ( result ) {
            return _.get(result, 'deletedCount', 0)
        }
        return null
    }

}

module.exports = TodoDb