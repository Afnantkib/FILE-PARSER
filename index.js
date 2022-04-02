const fs = require("fs");
// Reading files from file system module
const magazinesFile = fs.readFileSync('Magazines.csv', 'utf-8');
const booksFile = fs.readFileSync('Books.csv', 'utf-8');
const authorsFile = fs.readFileSync('Authors.csv', 'utf-8');

//converting raw file data to a JSON OBJECT
let booksJSO = csv2JSON(booksFile);
let magazinesJSO = csv2JSON(magazinesFile);
let authorsJSO = csv2JSON(authorsFile);
// Finding book and magazine by their ISNB number
let res1 = findByISNB(booksJSO, "2145-8548-3325");
let res2 = findByEmail(magazinesJSO, "2145-8548-3325");

// Sorting both Books and Magazines by their title
let booksAndMagzines = sortByTitle(booksJSO, magazinesJSO);

addNewBookAndExport("mera khud ka title", "mera isbn", "apun khud", "meri book", booksJSO);
addNewMagazineAndExport("my magazine","1234","afnan","my book",magazinesJSO)

// console.log(booksAndMagzines)



function addNewBookAndExport(title, isbn, authors, description, booksJSO) {

    let newBookOBJ = {
        title: title,
        isnb: isbn,
        authors: authors,
        description: description

    }
    booksJSO.push(newBookOBJ);
    let csvFile = JSON2csv(booksJSO)
    fs.writeFileSync("newbooks.csv", csvFile);

}
function addNewMagazineAndExport(title, isbn, authors, description, magazinesJSO) {

    let newBookOBJ = {
        title: title,
        isnb: isbn,
        authors: authors,
        description: description

    }
    magazinesJSO.push(newBookOBJ);
    let csvFile = JSON2csv(magazinesJSO)
    fs.writeFileSync("newmagazines.csv", csvFile);

}
function JSON2csv(json) {
    var array = typeof json != 'object' ? JSON.parse(json) : json;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ';'

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}
function sortByTitle(booksJSO, magazinesJSO) {
    let booksAndMagzines = magazinesJSO;
    for (let i = 0; i < booksJSO.length; i++) {

        booksAndMagzines.push(booksJSO[i]);
    }

    booksAndMagzines.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });

    return booksAndMagzines;


}
function findByISNB(json, isbn) {
    var res = {
        title: "",
        isbn: "",
        authors: "",
        description: ""
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].isbn == isbn) {
            res.title = json[i].title;
            res.isbn = json[i].isbn;
            res.authors = json[i].authors;
            res.description = json[i].description;

        }





    }

    // console.log(res)
    return res;

}
function findByEmail(json, email) {
    var res = {
        title: "",
        isbn: "",
        authors: "",
        description: ""
    }
    for (let i = 0; i < json.length; i++) {
        if (json[i].authors == email) {
            res.title = json[i].title;
            res.isbn = json[i].isbn;
            res.authors = json[i].authors;
            res.description = json[i].description;

        }





    }

    // console.log(res)
    return res;

}

function csv2JSON(csv) {

    var lines = csv.split("\r\n");

    var result = [];
    var headers = lines[0].split(";");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result
    return result; //JSON
}

























































