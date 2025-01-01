import io from 'socket.io-client'

export const SOCKET_EMIT_SET_BLOCK = 'set-block'
export const SOCKET_EVENT_IS_MENTOR = 'is-mentor'
export const SOCKET_EVENT_USERS_COUNT = 'connected-users-count'

export const SOCKET_EVENT_ADD_CODE = 'code-block-add'
export const SOCKET_EMIT_WRITE_CODE = 'code-block-write'

export const SOCKET_EMIT_LEAVE_BLOCK = 'leave-block'
export const SOCKET_EVENT_MENTOR_LEAVES = 'mentor-leave'



// export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

// socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            // const user = userService.getLoggedinUser()
            // if (user) this.login(user._id)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            console.log('emit', eventName);

            socket.emit(eventName, data)
        },
        // login(userId) {
        //     socket.emit(SOCKET_EMIT_LOGIN, userId)
        // },
        // logout() {
        //     socket.emit(SOCKET_EMIT_LOGOUT)
        // },
        terminate() {
            socket = null
        },

    }
    return socketService
}