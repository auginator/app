export default {
    success: (data) => { return { success: true, data } },
    error: (e) => { return { success: false, reason: e.reason, message: e.message } }
}