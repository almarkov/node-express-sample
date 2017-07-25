const QueryFile = require('pg-promise').QueryFile;
const path      = require('path');

function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {

    users: {
        all:         sql('sql/users/all.sql'),
        create:      sql('sql/users/create.sql'),
        update:      sql('sql/users/update.sql'),
        find:        sql('sql/users/find.sql'),
        delete:      sql('sql/users/delete.sql'),
    },

};