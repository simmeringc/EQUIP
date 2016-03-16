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
      var subject_info = {
         "subjAge":["0-10","10-15","15-20","20-25"],
         "subjGender":["Male","Female","Other"],
         "subjRace":["American Indian or Alaska Native","Asian","Black or African American","Native Hawaiin or Other Pacific Islander","White","Hispanic or Latino"]
      };

      var sequence_info = {
         "wcdType":["Math","Non-Math"],
         "solicitationMethod":["Called On","Not Called On"],
         "waitTime":["Less than 3 seconds","3 or more seconds","N/A"],
         "lengthOfTalk":["1-4 Words","5-20 Words","21 or more Words"],
         "studentTalk":["How","What","Why","Other"],
         "teacherSolicitation":["How","What","Why","Other"],
         "explicitEvaluation":["Yes","No"]
      };
      var options = {
         "environment":$('#selectEnvironment').val(),
         "student_char":$('#studentCharSelect').val(),
         "sequence_val":$('#sequenceCharSelect').val()
      };
      if(options["environment"]!="all")
      {
         environment=Environments.find({"envName":options["environment"]}).fetch();
         environment_id=environment[0]["_id"];
         sequences=Sequences.find({"envId":environment_id}).fetch();
      }

      else
      {
         sequences=Sequences.find().fetch();
      }
      var sequence_props = sequence_info[options["sequence_val"]];
      var subject_props = subject_info[options["student_char"]];
      var sequence_data=[]
      for(i=0;i<sequences.length;i++)
      {
         temp={};
         temp_subj_id=sequences[i]["subjId"];
         temp.subj_data=((Subjects.find({"_id":temp_subj_id}).fetch())[0])[options["student_char"]];
         temp.seq_data=sequences[i][options["sequence_val"]];
         sequence_data.push(temp);
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
      var data = {
        labels: sequence_info[options["sequence_val"]],
        series: graph_data
      };

      var options = {
        seriesBarDistance: 10
      }
      new Chartist.Bar('.ct-chart-bar', data, {
            plugins: [
                Chartist.plugins.legend()
            ]
        });
    }

});

