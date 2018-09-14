function updateEntryById (tableName, entryId, reqCols) {
    var query = ['UPDATE ' + tableName];
    query.push('SET');

    var set = [];
    Object.keys(reqCols).forEach(function (key, i) {
        set.push(key + ' = ($' + (i + 1) + ')'); 
    });
    query.push(set.join(', '));

    // Add the WHERE statement to look up by id
    query.push('WHERE id = ' + entryId );

    // Return a complete query string
    return query.join(' ');
}

module.exports = {
    updateEntryById: updateEntryById
};