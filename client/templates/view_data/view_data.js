Template.viewData.helpers({
   environment: function() {
      return Environments.find({}, {sort: {submitted: -1}});
   },
});

Template.viewData.helpers({
   sequences: function() {
      return Sequences.find();
   },
});

Template.viewData.helpers({
   subjects: function() {
      return Subjects.find();
   },
});

Template.viewData.events({
   'click #graph_button': function(e) {
      //clear the graph section before adding new ones
      $("#graph_container").children().each(function (){
         this.remove()
      });

      //lookup tables for the subject and sequence codes
      var subject_info = {
         "subjAge":["0-10","10-15","15-20","20-25","Unknown"],
         "subjGender":["Male","Female","Other","Unknown"],
         "subjRace":["American Indian or Alaska Native","Asian","Black or African American","Native Hawaiin or Other Pacific Islander","White","Hispanic or Latino","Unknown"]
      };

      var sequence_info = {
         "wcdType":["Math","Non-Math","Unknown"],
         "solicitationMethod":["Called On","Not Called On","Unknown"],
         "waitTime":["Less than 3 seconds","3 or more seconds","N/A"],
         "lengthOfTalk":["1-4 Words","5-20 Words","21 or more Words","Unknown"],
         "studentTalk":["How","What","Why","Other","Unknown"],
         "teacherSolicitation":["How","What","Why","Other"],
         "explicitEvaluation":["Yes","No","Unknown"]
      };

      //get values from dropdown menus
      var options = {
         "environment":$('#selectEnvironment').val(),
         "student_char":$('#studentCharSelect').val(),
         "sequence_val":$('#sequenceCharSelect').val()
      };

      //fetch a specific enviornment
      if(options["environment"]!="all")
      {
         var environment=Environments.find({"envName":options["environment"]}).fetch();
         var environment_id=environment[0]["_id"];
         var sequences=Sequences.find({"envId":environment_id}).fetch();
         var subjects=Subjects.find({"envId":environment_id}).fetch();
      }
      // fetch all enviornments
      else
      {
         var sequences=Sequences.find().fetch();
         var subjects=Subjects.find().fetch();
      }

      //grab array of sequence and subject info for easier refrencing
      var sequence_props = sequence_info[options["sequence_val"]];
      var subject_props = subject_info[options["student_char"]];

      //loop through every sequence and grab the selected sequence value and the subject id
      //then use the subject ID to look up the selected students characteristic
      var sequence_data=[]
      for(i=0;i<sequences.length;i++)
      {
         temp={};
         temp_subj_id=sequences[i]["subjId"];
         temp.subj_data=((Subjects.find({"_id":temp_subj_id}).fetch())[0])[options["student_char"]];
         temp.seq_data=sequences[i][options["sequence_val"]];
         sequence_data.push(temp);
      }

      function graph_standard(options)
      {
         //parse and format the data for chartist
         var graph_data=[];
         for(i=0;i<subject_info[options["student_char"]].length;i++)
         {
            var temp_data={"name":subject_info[options["student_char"]][i], "data":[]};
            for(j=0;j<sequence_info[options["sequence_val"]].length;j++)
            {
               temp_data["data"].push(0);
            }
            graph_data.push(temp_data);
         }
         for(i=0;i<sequence_data.length;i++)
         {
            var x = sequence_data[i]["seq_data"];
            var z = sequence_data[i]["subj_data"];
            graph_data[z]["data"][x]++;
         }
         var data = {
           labels: sequence_info[options["sequence_val"]],
           series: graph_data
         };

         var options = {
           seriesBarDistance: 10
         }*
         new Chartist.Bar('#ct-chart-standard', data, {
               plugins: [
                   Chartist.plugins.legend()
               ]
           });
         }

      function graph_demographics(options, subjects)
      {
         //loop through and tally the number of students in each category of the selected characteristic
         var temp_graph_data=[];
         for(i=0;i<subject_info[options["student_char"]].length;i++)
         {
            temp_graph_data.push(0);
         }
         for(i=0;i<subjects.length;i++)
         {
            temp_graph_data[subjects[i][[options["student_char"]]]]++;
         }
         graph_data=[];
         graph_data.push(temp_graph_data);
         var data = {
            labels: subject_info[options["student_char"]],
            series: graph_data
         };
         console.log(data);
         var options = {
           seriesBarDistance: 10
         }*
         new Chartist.Bar('#ct-chart-demographic', data);
      }

      function graph_scaled(options, subjects)
      {
         //get demographic tally
         var demographic_data=[];
         for(i=0;i<subject_info[options["student_char"]].length;i++)
         {
            demographic_data.push(0);
         }
         for(i=0;i<subjects.length;i++)
         {
            demographic_data[subjects[i][[options["student_char"]]]]++;
         }
         var num_of_students=0;
         var equity_factor = []
         for(i=0;i<demographic_data.length;i++)
         {
            num_of_students+=demographic_data[i];
         }
         for(i=0;i<demographic_data.length;i++)
         {
            if(num_of_students==0){
               equity_factor[i]=0;
            }
            else
            {
            equity_factor[i]=demographic_data[i]/num_of_students;
            }
         }
         var graph_data=[];
         for(i=0;i<subject_info[options["student_char"]].length;i++)
         {
            var temp_data={"name":subject_info[options["student_char"]][i], "data":[]};
            for(j=0;j<sequence_info[options["sequence_val"]].length;j++)
            {
               temp_data["data"].push(0);
            }
            graph_data.push(temp_data);
         }
         for(i=0;i<sequence_data.length;i++)
         {
            var x = sequence_data[i]["seq_data"];
            var z = sequence_data[i]["subj_data"];
            graph_data[z]["data"][x]++;
         }
         for(i=0;i<graph_data.length;i++)
         {
            for(j=0;j<graph_data[i]["data"].length;j++)
            {
               graph_data[i]["data"][j]*=equity_factor[i];
            }
         }
         var data = {
           labels: sequence_info[options["sequence_val"]],
           series: graph_data
         };
         console.log(data);
         var options = {
           seriesBarDistance: 10
         }*
         new Chartist.Bar('#ct-chart-equity', data, {
               plugins: [
                   Chartist.plugins.legend()
               ]
           });
      }

      if($("input:checkbox[id=graph_standard]:checked").val()=="on")
      {
         $("#graph_container").append("<h3>Standard Graph:</h3>");
         $("#graph_container").append("<div id='ct-chart-standard' class='ct-chart ct-chart-bar'></div>")
         graph_standard(options);
      }
      if($("input:checkbox[id=graph_demographic]:checked").val()=="on")
      {
         $("#graph_container").append("<h3>Demographic Graph:</h3>");
         $("#graph_container").append("<div id='ct-chart-demographic' class='ct-chart ct-chart-bar'></div>")
         graph_demographics(options, subjects);
      }

      if($("input:checkbox[id=graph_equity]:checked").val()=="on")
      {
         $("#graph_container").append("<h3>Equity Graph:</h3>");
         $("#graph_container").append("<div id='ct-chart-equity' class='ct-chart ct-chart-bar'></div>")
         graph_scaled(options, subjects);
      }
   },

   'click #export_CSV_button': function(e) {

     var selectEnvironment = $('#selectEnvironment').val();

     if(selectEnvironment!="all")
     {
        var environment=Environments.find({"envName":selectEnvironment}).fetch();
        var envId=environment[0]["_id"];
        var sequences=Sequences.find({"envId":envId}).fetch();
        var csv = Papa.unparse({
          fields: ["subjName", "wcdTypeLiteral", "solicitationMethodLiteral", "waitTimeLiteral", "lengthOfTalkLiteral", "studentTalkLiteral", "teacherSolicitationLiteral", "explicitEvaluationLiteral"],
          data: sequences,
        });
        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        //IE download API for saving files client side
        if (navigator.msSaveBlob) {
            csvURL = navigator.msSaveBlob(csvData, 'download.cv');
        } else {
        //Everything else
            csvURL = window.URL.createObjectURL(csvData);
        }
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'download.cv');
        tempLink.click();
      }
      else{
        var sequences=Sequences.find({}).fetch();
        var csv = Papa.unparse({
          fields: ["subjName", "wcdTypeLiteral", "solicitationMethodLiteral", "waitTimeLiteral", "lengthOfTalkLiteral", "studentTalkLiteral", "teacherSolicitationLiteral", "explicitEvaluationliteral"],
          data: sequences,
        });
        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        //IE download API for saving files client side
        if (navigator.msSaveBlob) {
            csvURL = navigator.msSaveBlob(csvData, 'download.cv');
        } else {
        //Everything else
            csvURL = window.URL.createObjectURL(csvData);
        }
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'download.cv');
        tempLink.click();
      }
    }
});
