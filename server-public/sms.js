$(document).ready(function () {
  var protocol = window.location.protocol + '//';
  var baseUrl = protocol + window.location.hostname + ':' + window.location.port;
  $.ajax({
    url: baseUrl + '/api/sms',
    dataType: 'json',
    success:function(data){
        // Removing all elements
        $('#tableBody').empty();

        // Creating the table
        data.forEach((item, i) => {
          var parsed = '<tr><td>';
          parsed += item.email + '</td><td>';
          parsed += item.code + '</td><td>';
          parsed += item.timestamp + '</td></tr>';
          $('#tableBody').append(parsed);
        });
      },
      error:function(){
        console.log('Error loading the SMSs')
      }
    });
});
