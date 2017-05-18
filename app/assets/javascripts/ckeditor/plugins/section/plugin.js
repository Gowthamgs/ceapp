(function() {
    var c = {
            exec: function(editor) {
                var a = CKEDITOR.instances.editor.getSelectedHtml();
                var c_length = a.$.children.length
                var merge_text = ""
                for (i= 0; i< c_length;i++){ 
        if(!a.$.children[i].textContent == ""){  
         merge_text += "<p>"
         merge_text += a.$.children[i].textContent
         merge_text += "</p>"
         merge_text += "\n"
         merge_text += "\n"
         }
       }
                first_line = a.$.children[0].textContent
                var document_text = CKEDITOR.instances.editor.getData();
                var merge = merge_text.replace(/<p>/g, "");
                merge = merge_text.replace(/<\/?p[^>]*>/g, "");
                merge = "<div id="+first_line.split(' ')[0]+" class='myClass'>" + merge + "</div>"
                // var id = first_line.replace(/\s/g, "_");
                var text = document_text.replace(merge_text, merge);
                CKEDITOR.instances['editor'].setData(text);
                console.log(merge_text);
                console.log(merge);
                // var a = CKEDITOR.instances.editor.getSelectedHtml();
                // var c_length = a.$.children.length
                // var text=CKEDITOR.instances.editor.getData();
                // for (i = 0; i < c_length; i++) {
                //     var merge_text = ""
                //     var first_line = ""
                //     var merge = ""
                //     merge_text += "<p>"
                //     merge_text += a.$.children[i].textContent
                //     merge_text += "</p>"
                //         // }
                //         // alert("here");
                //         // for (i= 0; i< c_length;i++){ 
                //     first_line = a.$.children[i].textContent
                //     merge = merge_text.replace(/<p>/g, "");
                //     merge = merge_text.replace(/<\/?p[^>]*>/g, "");
                //     merge = "<div id='" + first_line.split(" ")[0] + "'>" + merge + "</div>"
                //         //var id = first_line.replace(/\s/g, "_");
                //     text = text.replace(merge_text, merge);
                //     //console.log(text);


                //     //     console.log(CKEDITOR.instances.editor.getSelectedHtml());
                //     //     var format = {
                //     //     element : "div"
                //     //     };
                //     // var style = new CKEDITOR.style(format);
                //     // style.apply(editor.document);
                // }
                // console.log(text);
                // CKEDITOR.instances['editor'].setData(text);
            }
        },

        b = "section";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, c);
            editor.ui.addButton(b, {
                label: "Section",
                icon: this.path + "section.png",
                command: b
            });

        }
    });
})();
