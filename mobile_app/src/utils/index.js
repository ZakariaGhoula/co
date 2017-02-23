
export function createReducer(initialState, reducerMap) {

    return (state = initialState, action) => {

        const reduceFn = reducerMap[action.type];
        if (reduceFn) {
            return reduceFn(state, action);
        } else {
            return state;
        }

    };

}
export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {

        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {

    return response.json()
}

export function all_items_present(str, items) {
    var i;
    var found = true;

    var len_items = items.length;

    var retour =[];
    for (i = 0; i < len_items; i++) {
        var length_message  = items[i].messages.length;
        var j;
        for (j = 0; j < length_message; j++) {
            if (items[i].messages[j].user.first_name.toLowerCase().includes(str.toLowerCase())
                ||
                items[i].messages[j].user.last_name.toLowerCase().includes(str.toLowerCase())
                ||
                (items[i].messages[j].user.last_name.toLowerCase()+" "+items[i].messages[j].user.first_name.toLowerCase()).includes(str.toLowerCase())
                ||
                (items[i].messages[j].user.first_name.toLowerCase()+" "+items[i].messages[j].user.last_name.toLowerCase()).includes(str.toLowerCase())

            ) {
                retour.push(items[i])
                break;
            }
        }

    }

    return retour;
}