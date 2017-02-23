$(document).ready(function(){
   var editor = CKEDITOR.instances.editor;
   editor.addCommand("mySimpleCommand", { // create named command
       exec: function(edt) {
       var a = CKEDITOR.instances.editor.getSelectedHtml();
       var c_length = a.$.children.length
       var merge_text = ""
       var first_line=""
       for (i= 0; i< c_length;i++){ 
       console.log(a.$.children[i].textContent)     
         merge_text += "<p>"
         merge_text += a.$.children[i].textContent
         merge_text += "</p>"
         merge_text += "\n"
         merge_text += "\n"
       }
       first_line=a.$.children[0].textContent
       var document_text = CKEDITOR.instances.editor.getData();
       var merge = merge_text.replace( /<p>/g, "" );
       merge = merge_text.replace(/<\/?p[^>]*>/g, "");
                merge = "<p id="+first_line.split(' ')[0]+" class='myClass'>" + merge + "</p>"
                // var id = first_line.replace(/\s/g, "_");
                //merge_text = merge_text.replace(/<p[^>]*><\\/p[^>]*>/g , "");
        var text = document_text.replace(merge_text, merge);
                CKEDITOR.instances['editor'].setData(text);
                // console.log(merge_text);
                // console.log(merge);



      
          //document.getElementById('editor').id=first_line.replace(" ","_")
        }

   })
   editor.keystrokeHandler.keystrokes[CKEDITOR.ALT + 66 /* B */] = 'mySimpleCommand';
});




