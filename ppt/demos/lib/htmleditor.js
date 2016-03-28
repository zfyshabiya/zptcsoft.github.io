var emmetSupport=true,
    texteditor=$("#editor"),
    previewer=$("#preview"),
    fileParam = getUrlParam('file'),
    codeMirror;

//分隔窗口
$('div.split-pane').splitPane();

//CodeMirror实现编辑和预览
//获取url地址的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
function createScript(jsUrl){
  var body = document.getElementsByTagName('body')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = jsUrl;
  body.appendChild(script);
}

function initEditor(){
    codeMirror = CodeMirror.fromTextArea(texteditor[0], {
        lineNumbers: true,
        mode: 'htmlmixed',
        viewportMargin: Infinity,
        theme: 'monokai'
    });
    if (emmetSupport) {
        createScript("lib/emmet.js");
        emmetCodeMirror(codeMirror);
    }
    codeMirror.on('change', setPreview);
    setPreview();
}

function setPreview() {
    requestAnimationFrame(function() {
        previewer[0].srcdoc = codeMirror.getValue();
    });
}

function getEditorData(){
    if (fileParam) {
        var url = window.location.href,
            fileUrl = url.substr(0, url.lastIndexOf('/') + 1) + fileParam + '.html';

        $.ajax({
            url: fileUrl,
            success: function(data) {
                texteditor[0].value = data;
                initEditor();
            }
        });

    } else {
        texteditor[0].value = "!";
        initEditor();
    }
}

getEditorData();