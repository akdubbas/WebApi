// Write your JavaScript code.


$(document).ready(function(){
$( "#datepicker" ).datepicker({
      
        dateFormat: 'yy-mm-dd'
    });


function getDataSkyForecast(result,labels){


 var tmax = [];
            var tmin = [];
$.each(result, function( index, value ) {
            tmax.push(value.daily.data[0].temperatureMax)
            tmin.push(value.daily.data[0].temperatureMin)
            });


           
          var config={
  "type": "line",
  "data": {
    "labels": labels,
    "datasets": [
      {
        "label": "Tmax",
        "data": tmax,
        "fill": false,
        "borderColor": "rgb(75, 192, 192)",
        "lineTension": 0.1
      },
      {
        "label": "Tmin",
        "data": tmin,
        "fill": false,
        "borderColor": "rgb(255, 77, 77)",
        "lineTension": 0.1
      }
    ]
  },
  "options": {}
};
var forecast2 = new Chart(document.getElementById("canvas1"),config);



}

function getForecast(result,labels){

     
            var tmax = [];
            var tmin = [];
           
            $.each(result, function( index, value ) {
            labels.push(value.DATE)
            tmax.push(value.TMAX)
            tmin.push(value.TMIN)
            });

          var config={
  "type": "line",
  "data": {
    "labels": labels,
    "datasets": [
      {
        "label": "Tmax",
        "data": tmax,
        "fill": false,
        "borderColor": "rgb(75, 192, 192)",
        "lineTension": 0.1
      },
      {
        "label": "Tmin",
        "data": tmin,
        "fill": false,
        "borderColor": "rgb(255, 77, 77)",
        "lineTension": 0.1
      }
    ]
  },
  "options": {}
};
new Chart(document.getElementById("canvas"),config);
}


    $("#submitButton").click(function(){

    var forecast = new Chart(document.getElementById("canvas1"));
    forecast.destroy();
    var forecast = new Chart(document.getElementById("canvas"));
    forecast.destroy();
    var currentDate = $( "#datepicker" ).val()

    if(currentDate!="")
    {

    var backUpDate = new Date(currentDate)
    var timestamp = (new Date(currentDate).getTime())/1000

    var secondDayDate= new Date(backUpDate);

    secondDayDate.setDate(secondDayDate.getDate() + 1);
    var secondDayTimeStamp = (new Date(secondDayDate).getTime())/1000


    secondDayDate.setDate(secondDayDate.getDate() + 1);
    var thridDayTimeStamp = (new Date(secondDayDate).getTime())/1000

     secondDayDate.setDate(secondDayDate.getDate() + 1);
    var fourthDayTimeStamp = (new Date(secondDayDate).getTime())/1000

     secondDayDate.setDate(secondDayDate.getDate() + 1);
    var fifthDayTimeStamp = (new Date(secondDayDate).getTime())/1000

     secondDayDate.setDate(secondDayDate.getDate() + 1);
    var sixDayTimeStamp = (new Date(secondDayDate).getTime())/1000

     secondDayDate.setDate(secondDayDate.getDate() + 1);
    var seventhDayTimeStamp = (new Date(secondDayDate).getTime())/1000







    var formatedDate = currentDate.split('-')
    var myApiDate = formatedDate[0]+formatedDate[1]+formatedDate[2]
   
    $("#submitButton").attr("disabled",true);
    var labels=[];
    var AjaxCall=[];

        var dataSkyurl = "https://cors-anywhere.herokuapp.com/";
        var toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+timestamp+'?exclude=currently,flags,hourly';
           
           AjaxCall.push($.ajax(toatlUrl))
       
         toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+secondDayTimeStamp+'?exclude=currently,flags,hourly';
           
           AjaxCall.push($.ajax(toatlUrl))

         toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+thridDayTimeStamp+'?exclude=currently,flags,hourly';
           AjaxCall.push($.ajax(toatlUrl))

         toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+fourthDayTimeStamp+'?exclude=currently,flags,hourly';
          AjaxCall.push($.ajax(toatlUrl))

         toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+fifthDayTimeStamp+'?exclude=currently,flags,hourly';
           AjaxCall.push($.ajax(toatlUrl))

           toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+sixDayTimeStamp+'?exclude=currently,flags,hourly';
           AjaxCall.push($.ajax(toatlUrl))

           toatlUrl = dataSkyurl+"https://api.darksky.net/forecast/036f3f9697eb50c3eeb71933c829221d/39.1031,-84.5120,"+seventhDayTimeStamp+'?exclude=currently,flags,hourly';
           AjaxCall.push($.ajax(toatlUrl))



    var url = "api/forecast/" + myApiDate

     $.ajax({url: url, success: function(result){
     $("#submitButton").attr("disabled",false);
     getForecast(result,labels)
            Q.all(AjaxCall).then(function(result){

           getDataSkyForecast(result,labels)
           })
            

           }
        });





       }
       else{
       alert("Please select a date")
       }


     });




});