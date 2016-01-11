$(function() {
var editor = CodeMirror.fromTextArea(document.getElementById('dockerfile__code'), {
  mode: 'text/x-dockerfile',
  lineNumbers: true,
  viewportMargin: Infinity,
});
var widgets = [];

function updateHints(checks) {
  editor.operation(function() {
    $.each(widgets, function(_, widget) {
      editor.removeLineWidget(widget);
    });

    widgets = [];
    $.each(checks, function(_, check) {
      var hint = $('<div class="lint-error">' + check.message +'</div>').get(0);
      var linenumber = 0;
      if(check.linenumber) {
        linenumber = check.linenumber - 1;
      }
      var widget = editor.addLineWidget(linenumber, hint, {
        coverGutter: false,
        noHScroll: true,
        above: true
      });
      widgets.push(widget);
    });
  });
}
$('#lint').click(function() {
  var src = editor.getDoc().getValue();
  var checks = Haste.analyzeString(src);
  console.log(checks);
  updateHints(checks);
});

window.setTimeout(function() {
  $('#lint').click();
}, 2000);
});
