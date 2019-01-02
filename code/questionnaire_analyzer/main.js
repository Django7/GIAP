var FILES = [];
var FILES_LOADED = [];
var IN_ARRAY = [];
var SEPARATOR = "|";

function startAnalyzing() {
    if(FILES.length === 0){
        console.error("You have to upload files at first!");
        return;
    }

    FILES_LOADED = [];
    IN_ARRAY = [];

    currentFileToProgress = 0;
    header = "Question" + SEPARATOR;

    nextFile();
}

var header = "";
var currentFileToProgress = 0;
function nextFile(){
    if(currentFileToProgress >= FILES.length){
        return;
    }
    var f = FILES[currentFileToProgress];
    header += f.name;
    if(currentFileToProgress < FILES.length - 1){
        header += SEPARATOR;
    }
    var reader = new FileReader();
    reader.readAsText(f);
    $(reader).on('load', processFile);
    ++currentFileToProgress;
}

function processFile(e){
    var file = e.target.result;
    if (file && file.length){
        var file_replaced = file.replace(/\s\s+/g, ' ');
        var json_tmp = JSON.parse(file_replaced);
        var json = JSON.parse(json_tmp);
        FILES_LOADED.push(json);
        if(FILES_LOADED.length === FILES.length){
            createCSV();
        }
    }
    nextFile();
}

function createCSV(){
    var pattern = $('input[name=pattern]:checked').val();
    console.log("Selected pattern: " + pattern);
    var pattern_object = PATTERNS[pattern];
    var keys = Object.keys(pattern_object);
    for(var i = 0; i < keys.length; i++){
        createCSVBelow(pattern_object, keys[i])
    }

    IN_ARRAY.unshift(header);

    var result = $('#result');
    result.html("");
    for(var i = 0; i < IN_ARRAY.length; i++){
        result.append(IN_ARRAY[i] + "<br>");
    }
}

function createCSVBelow(obj, key){
    if (typeof obj[key] === "boolean"){
        IN_ARRAY.push(getDataFromQuestionnaires(key, null));
    }else{
        var keys = Object.keys(obj[key]);
        for(var i = 0; i < keys.length; i++){
            IN_ARRAY.push(getDataFromQuestionnaires(key, keys[i]));
        }
    }
}

function getDataFromQuestionnaires(root, path){
    var data = path === null ? root + SEPARATOR : root + "/" + path + SEPARATOR;
    for(var i = 0; i < FILES_LOADED.length; i++){
        var value;
        if(path === null){
            value = FILES_LOADED[i][root]
        }else{
            value = FILES_LOADED[i][root] ? FILES_LOADED[i][root][path] : ""
        }
        value = value || "";
        data += value;
        if(i < FILES_LOADED.length - 1) {
            data += SEPARATOR;
        }
    }
    return data;
}


function download() {
    if(IN_ARRAY.length > 0) {
        download_FF_CH("Report", $('#result').html().replace(/<br\s*[\/]?>/gi, '\n'));
    }else{
        console.error("You need to parse the file (Press 'Start')");
    }
}

/**
 * Let's you download a file with respective filename and content
 * @param filename The filename suggested to the user
 * @param text The content of the text file
 */
function download_FF_CH(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function upload(evt) {
    FILES = evt.target.files; // FileList object
    var output = [];
    for (var i = 0, f; f = FILES[i]; i++) {
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes</li>');
    }
    document.getElementById('list')
        .innerHTML = '<ul>' + output.join('') + '</ul>';
}

document.getElementById('files')
    .addEventListener('change', upload, false);