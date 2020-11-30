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

            const result = await this.__todoDb.saveSingleTodo(todo)

            

            return {
                status: constants.HTTP_STATUS_CODES.OK,
                body: _.get(result, 'ops', '')
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
            console.error(e.message)
            return {
                status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                body: 'Internal Server Error'
            }
        }
    }

    async removeManyTodos (idArray) {
        if (_.isEmpty(idArray)) {
            return {
                status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
                body: 'Bad request'
            }
        }

        try {
            const result = await this.__todoDb.deleteManyTodos(idArray)
            if ( result === 0 ) {
                return {
                    status: constants.HTTP_STATUS_CODES.GONE,
                    body: 'Already Deleted or Doesn\'t Exist'
                }
            } else if ( result < idArray.length) {
                return {
                    status: constants.HTTP_STATUS_CODES.OK,
                    body: 'Successfully Deleted and some Todos alredy deleted'
                }
            } else {
                return {
                    status: constants.HTTP_STATUS_CODES.OK,
                    body: 'Successfully Deleted'
                }
            }
            
        } catch (e) {
            console.error(e.message)
            return {
                status: constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                body: 'Internal Server Error'
            }
        }
    }

    async updateCompletenessOfOneTodo (id, completeness) {
        if (!ObjectID.isValid(id) || !_.isBoolean(completeness)) {
            return {
                status: constants.HTTP_STATUS_CODES.BAD_REQUEST,
                body: 'Bad request'
            }
        }

        try {
            const result = await this.__todoDb.updateOneTodo(id, completeness)
            
            if ( result.matchedCount === 1 && result.modifiedCount === 1) {
                return {
                    status: constants.HTTP_STATUS_CODES.OK,
                    body: 'Successfully Updated'
                }
            } else if ( result.matchedCount === 1 && result.modifiedCount === 0) {
                return {
                    status: constants.HTTP_STATUS_CODES.OK,
                    body: 'Request no right content'
                }
            } else {
                return {
                    status: constants.HTTP_STATUS_CODES.NOT_FOUND,
                    body: 'Not Found'
                }
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
