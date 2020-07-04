$(document).ready(function () {
  $.ajax({
    url: 'https://polimi-dil-civis.herokuapp.com/api/sms',
    dataType: 'json',
    success:function(data){
        // Removing all elements
        $('#tableBody').empty();

        // Creating the table
        data.forEach((item, i) => {
          console.log(item);
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
