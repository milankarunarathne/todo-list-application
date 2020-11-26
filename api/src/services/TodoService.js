const _ = require('lodash')
const TodoDb = require('../db/TodoDb')
const constants = require('../constants')

class TodoService {
    constructor(dbConn) {
        this.__todoDb = new TodoDb(dbConn)
    }

    async saveTodo(todo) {
        if (_.isEmpty(todo)) {
            return {
                status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
                body: 'Required data missing'
            }
        }

        try {

            await this.__todoDb.saveSingleTodo(todo)

            return {
                status: constants.HTTP_STATUS_CODES.OK,
                body: 'Successfully Inserted'
            }

        } catch (e) {
            console.error(e.message)
            return {
                status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                body: 'Internal Server Error'
            }
        }
    }


}

module.exports = TodoService