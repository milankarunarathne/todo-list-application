const _ = require('lodash')
const TodoDb = require('../db/TodoDb')
const constants = require('../constants')
const { ObjectID } = require('mongodb')

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

    async retrieveAllTodos() {
        try {
            
            const result = await this.__todoDb.getAllTodos()
            
            return {
                status: constants.HTTP_STATUS_CODES.OK,
                body: result
            }

        } catch (e) {
            console.error(e.message)
            return {
                status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                body: 'Internal Server Error'
            }
        }
    }

    async removeOneTodo(id) {
        if (!ObjectID.isValid(id)) {
            return {
                status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
                body: 'Required ID is wrong'
            }
        }

        try {
            const result = await this.__todoDb.deleteOneTodo(id)

            if (result === 0) {
                return {
                    status: constants.HTTP_STATUS_CODES.GONE,
                    body: 'Already Deleted or Doesn\'t Exist'
                }
            } else {
                return {
                    status: constants.HTTP_STATUS_CODES.OK,
                    body: 'Successfully Deleted'
                }
            }


        } catch (e) {
            
        }
    }

}

module.exports = TodoService