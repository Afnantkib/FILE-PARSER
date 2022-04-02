(function(){
    
    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
        // console.log(event.target.result);
        var csv =event.target.result;
        let jsonData=csv2JSON(csv);
        addToHtml(jsonData);
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
function addToHtml(jsonData){
    let text = "<table><tr>"
{/* Title</td><td>ISBN</td><td>Author</td><td>Published</td></tr> */}
    for ( key in jsonData[0]) {
        text+="<td>"+key+"</td>"
        // console.log(key)
        // console.log(jsonData[0][key]);
    }
    text+="</tr><tr>"

    for (let x=0;x<jsonData.length;x++) {
for(key in jsonData[x]){
      text += "<td>" + jsonData[x][key] + "</td> ";
    }
    text+="</tr>"
}
    text += "</table>"    
    document.getElementById("output").innerHTML = text;





}








    document.getElementById('file').addEventListener('change', onChange);

}());










// function upload(){
//     console.log("Button clicked")
//     const file = document.getElementById('file').files[0];
 
//     let reader = new FileReader();
//     reader.addEventListener("load", function(e){
//         console.log("here")
//         let data = window.event.target.result;
//         let resource = JSON.parse(data);
// console.log(data);
// console.log(resource);
        
//     })
//     reader.readAsText(file)     
// }