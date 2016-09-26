$(function(){
  var db = new Firebase('https://meetup-a696c.firebaseio.com/events')
  db.on('child_added',function(snap){
    var data = snap.val();
    var m = '<tr><td>' + data.name + '</td>' + '<td>' + data.type + '</td>' + '<td>' + data.host + '</td>';
    m = m + '<td>' + data.location + '</td>' + '<td>' + data.start + '</td>' + '<td>' + data.end + '</td>';
    m = m + '<td>' + data.guest + '</td>' + '<td>' + data.info  + '</td></tr>';
    $('#tt').append(m);

  });

});
