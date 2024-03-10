export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        filter: filter
    }
}

export const clearFilter = filter => {
    return {
        type: 'CLEAR_FILTER',
        filter: filter
    }
}

export const addTrxn = transaction => {
    return {
        type: 'ADD_TRXN',
        transaction
    }
}

export const setBalance = (transaction) => {
    return {
        type: 'SET_BALANCE',
        transaction
    }
}

export const setIncome = (transaction) => {
    return {
        type: 'SET_INCOME',
        transaction
    }
}
export const setExpense = (transaction) => {
    return {
        type: 'SET_EXPENSE',
        transaction
    }
}
export const removeTrxn = (transaction) => {
    return {
        type: 'REMOVE_TRXN',
        transaction
    }
}