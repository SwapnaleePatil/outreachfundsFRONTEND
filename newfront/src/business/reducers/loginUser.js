export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BUSINESS':
            return action.payload;
        case 'LOG_OUT':
            return state = []
        default:
            return state;
    }
}
