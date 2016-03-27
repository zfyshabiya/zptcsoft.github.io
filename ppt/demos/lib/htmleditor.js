(function() {
    'use strict';

    //分隔窗口
    document.title = 'html在线编辑器';
    var pane = $('div.split-pane').children('.split-pane-divider');
    $('div.split-pane').splitPane();

    //CodeMirror实现编辑和预览
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    
    var texteditor = document.querySelector('textarea');
    
    /*
    var file=getUrlParam('file'),
        url= window.location.href,
        fileUrl = url.substr(0,url.lastIndexOf('/')+1),
        reader = new FileReader();

    if(file){
        reader.readAsText(fileUrl+file+'.html');
        reader.addEventListener('load', function() {
            texteditor.value = this.result;
        });  
    }else{
        texteditor.value = [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '    <meta charset="utf-8" />',
            '    <title></title>',
            '</head>',
            '<body>',
            '',
            '</body>',
            '</html>',
        ].join('\n');
    }
    */

    texteditor.value = [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '    <meta charset="utf-8" />',
        '    <title></title>',
        '</head>',
        '<body>',
        '',
        '</body>',
        '</html>',
    ].join('\n');

    var ed = CodeMirror.fromTextArea(texteditor, {
        lineNumbers: true,
        mode: 'htmlmixed',
        viewportMargin: Infinity,
        theme: 'monokai'
    });

    emmetCodeMirror(ed);

    function setPreview() {
        // document.querySelector('#preview').innerHTML = ed.getValue(); // innerHTML won't execute scripts, so we use jQuery
        requestAnimationFrame(function() {
            // $('#preview').html(ed.getValue());
            $('#preview')[0].srcdoc = ed.getValue();
        });
    }

    setPreview();
    ed.on('change', setPreview);

}());
