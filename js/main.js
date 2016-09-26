$('.created').hide();
$('.crea').hide();
$(function(){

  $('#host-event').submit(function(event){
    var schema = {
      name : $("#name").val(),
      type : $("#type").val(),
      host : $("#host").val(),
      location : $("#location").val(),
      start : $("#start-time").val(),
      end : $("#end-time").val(),
      guest : $("#guest").val(),
      info : $("#info").val()
    }

    var db = new Firebase('https://meetup-a696c.firebaseio.com/')
    db.child("events")
      .push().set(schema);
    event.preventDefault();
    $('#host-event')[0].reset();
    $('.created').show();
    alert("Event added successfully!");
  });

  function issueTracker(){
      this.issues = [];
    }
    issueTracker.prototype =  {
      add : function(issue){
        this.issues.push(issue);
      },

      retrieve : function() {
        var message = "";
        switch (this.issues.length) {
          case 0:
            break;
          case 1:
            message = this.issues[0];
            break;
          default:
            message = "Please solve the following issues : \n" + this.issues.join("\n");
        }
        return message;
      }
    }

    var first = document.getElementById('password');
    var second = document.getElementById('rpass');

    var pf = first.value;
    var ps = first.value;

    $('#submit').click(function(event){
      $('.crea').hide();
      pf = first.value;
      ps = second.value;

      var isf = new issueTracker();
      var iss = new issueTracker();
      if ((pf === ps) && (pf.length > 0)){
        checkReq();
      }else{
        iss.add("Passwords must match!");
      }

      fmes = isf.retrieve();
      smes = iss.retrieve();

      first.setCustomValidity(fmes);
      second.setCustomValidity(smes);
      if(fmes.length + smes.length === 0){
        event.preventDefault();
        $('.crea').show();
        $('#create-ac')[0].reset();
        alert("Account created successfully!");
      }

      function checkReq() {

        if(pf.length < 8){
          isf.add("Password Length is too short (atlease 8)");
        }else if(pf.length > 20){
          isf.add("Password Length is too long (max 20)");
        }
        if (!pf.match(/[\!\@\#\$\%\^\&\*]/g)) {
          isf.add("missing a symbol (!, @, #, $, %, ^, &, *)");
        }

        if (!pf.match(/\d/g)) {
          isf.add("missing a number");
        }

        if (!pf.match(/[a-z]/g)) {
          isf.add("missing a lowercase letter");
        }

        if (!pf.match(/[A-Z]/g)) {
          isf.add("missing an uppercase letter");
        }

        var illegalCharacterGroup = pf.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
        if (illegalCharacterGroup) {
          illegalCharacterGroup.forEach(function (illegalChar) {
            isf.add("includes illegal character: " + illegalChar);
          });
        }
      }


    });

});
