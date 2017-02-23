
CKEDITOR.editorConfig = function( config )
{ 
	//config.format_small: {element: 'small', name: 'Small'},
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;subtitle;pre';
	config.extraPlugins = "section";

	config.toolbar = [
  { name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
	    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph',  items: [ 'NumberedList', 'BulletedList', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ]  }
      ];
    config.enterMode = CKEDITOR.ENTER_BR;
    config.allowedContent = true;
    config.disallowedContent = 'br';
    config.shiftEnterMode = CKEDITOR.ENTER_P;

    config.keystrokes=[
      [ CKEDITOR.ALT + 121 /*F10*/, 'toolbarFocus' ],
      [ CKEDITOR.ALT + 122 /*F11*/, 'elementsPathFocus' ],

      [ CKEDITOR.SHIFT + 121 /*F10*/, 'contextMenu' ],

      [ CKEDITOR.CTRL + 90 /*Z*/, 'undo' ],
      [ CKEDITOR.CTRL + 89 /*Y*/, 'redo' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90 /*Z*/, 'redo' ],

      [ CKEDITOR.CTRL + 76 /*L*/, 'link' ],

      [ CKEDITOR.CTRL + 66 /*B*/, 'bold' ],
      [ CKEDITOR.CTRL + 73 /*I*/, 'italic' ],
      [ CKEDITOR.CTRL + 85 /*U*/, 'underline' ],

      [ CKEDITOR.ALT + 109 /*-*/, 'toolbarCollapse' ],
      [ CKEDITOR.ALT + 65 /*A*/, 'anchor' ],
      [ CKEDITOR.CTRL + 77 /*M*/, 'indent' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 77 /*M*/, 'outdent' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 88 /*X*/, 'strike' ],
      [ CKEDITOR.CTRL + 13 /*ENTER*/, 'pagebreak' ],
      [ CKEDITOR.ALT + 13 /*ENTER*/, 'pagebreak' ],
      [ CKEDITOR.CTRL + 56 /*8*/, 'bulletedlist' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 56 /*8*/, 'bulletedListStyle' ],
      [ CKEDITOR.CTRL + 73 /*I*/, 'italic' ],
      [ CKEDITOR.CTRL + 74 /*J*/, 'justifyblock' ],
      [ CKEDITOR.CTRL + 69 /*E*/, 'justifycenter' ],
      [ CKEDITOR.CTRL + 76 /*L*/, 'justifyleft' ],
      [ CKEDITOR.CTRL + 82 /*R*/, 'justifyright' ],
      [ CKEDITOR.CTRL + 55 /*7*/, 'numberedlist' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 55 /*7*/, 'numberedListStyle' ],
      [ CKEDITOR.CTRL + 89 /*Y*/, 'redo' ],
      [ CKEDITOR.ALT + 68 /*D*/, 'creatediv' ],
      [ CKEDITOR.ALT + 72 /*H*/, 'horizontalrule' ],
      [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 70 /*F*/, 'find' ],
      [ CKEDITOR.ALT + 66 /*B*/,'mySimpleCommand'],
      [ CKEDITOR.ALT + 83 /*S*/, 'section' ]];
      


  
 //config.extraPlugins = 'title,subtitle';
 //config.disallowedContent = 'br';
//  CKEDITOR.keystrokeHandler = function( editor ) {
// 	if ( editor.keystrokeHandler )
// 		return editor.keystrokeHandler;
//     this.keystrokes = {};
// 	this.blockedKeystrokes = {};

// 	this._ = {
// 		editor: editor
// 	};

// 	return this;
// };
    // CKEDITOR.plugins.add('keystrokes',
    // {beforeInit:function(editor)
    // 	{editor.keystrokeHandler=new CKEDITOR.keystrokeHandler(editor);
    // 		editor.specialKeys={};},
    // 	init:function(editor)
    // 	{var b=editor.config.keystrokes,c=editor.config.blockedKeystrokes,d=editor.keystrokeHandler.keystrokes,e=editor.keystrokeHandler.blockedKeystrokes;
    // 		for(var f=0;f<b.length;f++)d[b[f][0]]=b[f][1];
    // 			for(f=0;f<c.length;f++)e[c[f]]=1;}});
    // CKEDITOR.keystrokeHandler=function(editor)
    //    {var b=this;
    //    	if(editor.keystrokeHandler)return editor.keystrokeHandler;b.keystrokes={};
    //    	b.blockedKeystrokes={};
    //    	b._={editor:editor};
    //    	return b;};
    //    	(function()
    //    	{var editor,b=function(d)
    //    	{d=d.data;
    //    	var e=d.getKeystroke(),f=this.keystrokes[e],g=this._.editor;
    //    	a=g.fire('key',{keyCode:e})===true;if(!a){if(f)
    //    	{var h={from:'keystrokeHandler'};
    //    	editor=g.execCommand(f,h)!==false;}
    //    	if(!editor){var i=g.specialKeys[e];
    //    	editor=i&&i(g)===true;if(!editor)editor=!!this.blockedKeystrokes[e];
    //     }}
    //     if(editor)d.preventDefault(true);return!editor;},
    //     c=function(d){if(a){a=false;
    //     d.data.preventDefault(true);
    //     }};
    // CKEDITOR.keystrokeHandler.prototype={attach:function(d)
    // 	{d.on('keydown',b,this);
    // 	if(CKEDITOR.env.opera||CKEDITOR.env.gecko&&CKEDITOR.env.mac)d.on('keypress',c,this);
    // }};})();
    // CKEDITOR.config.blockedKeystrokes=[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85];
    // CKEDITOR.config.keystrokes=[
    // [CKEDITOR.ALT+121,'toolbarFocus'],
    // [CKEDITOR.ALT+122,'elementsPathFocus'],
    // [CKEDITOR.SHIFT+121,'contextMenu'],
    // [CKEDITOR.CTRL+CKEDITOR.SHIFT+121,'contextMenu'],
    // [CKEDITOR.CTRL+90,'undo'],
    // [CKEDITOR.CTRL+89,'redo'],
    // [CKEDITOR.CTRL+CKEDITOR.SHIFT+90,'redo'],
    // [CKEDITOR.CTRL+76,'link'],
    // [CKEDITOR.CTRL+66,'bold'],
    // [CKEDITOR.CTRL+73,'italic'],
    // [CKEDITOR.CTRL+85,'underline'],
    // [CKEDITOR.ALT+109,'toolbarCollapse']];

}
