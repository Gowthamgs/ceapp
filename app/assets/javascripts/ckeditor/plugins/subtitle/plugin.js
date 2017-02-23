(function(){
var a=
{
    exec:function(editor){
        var format = {
        element : "subtitle"
        };
    var style = new CKEDITOR.style(format);
    style.apply(editor.document);
    }
},

b="subtitle";
CKEDITOR.plugins.add(b,{
    init:function(editor){
    editor.addCommand(b,a);
    editor.ui.addButton(b,{
    label:"sub-title",
    icon: this.path + "sub-title.png",
    command:b
    });
    }
});
})();