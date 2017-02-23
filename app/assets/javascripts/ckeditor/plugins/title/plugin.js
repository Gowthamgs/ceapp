(function(){
var a=
{
    exec:function(editor){
        var format = {
        element : "title"
        };
    var style = new CKEDITOR.style(format);
    style.apply(editor.document);
    }
},

b="button-title";
CKEDITOR.plugins.add(b,{
    init:function(editor){
    editor.addCommand(b,a);
    editor.ui.addButton(b,{
    label:"Title",
    icon: this.path + "title.png",
    command:b
    });
    }
});
})();