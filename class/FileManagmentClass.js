const fs = require('fs');
const path = require('path');

class FileManagmentClass {
    
    // Método para obtener el contenido de un archivo
    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Método para crear un archivo con contenido
    static createFile(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

}

module.exports = FileManagmentClass;