(function(){
var a=
{
    exec:function(editor){
        var format = {
        element : "paragraph"
        };
    var style = new CKEDITOR.style(format);
    style.apply(editor.document);
    }
},

b="paragraph";
CKEDITOR.plugins.add(b,{
    init:function(editor){
    editor.addCommand(b,a);
    editor.ui.addButton(b,{
    label:"paragraph",
    icon: this.path + "paragraph.png",
    command:b
    });
    }
});
})();