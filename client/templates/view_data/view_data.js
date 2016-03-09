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
         "age":["0-10","10-15","15-20","20-25"],
         "gender":["Male","Female","Other"],
         "race":["American Indian or Alaska Native","Asian","Black or African American","Native Hawaiin or Other Pacific Islander","White","Hispanic or Latino"]
      };

      var sequence_info = {
         "wcd_type":["Math","Non-Math"],
         "solicitation_method":["Called On","Not Called On"],
         "wait_time":["Less than 3 seconds","3 or more seconds","N/A"],
         "length_of_talk":["1-4 Words","5-20 Words","21 or more Words"],
         "student_talk":["How","What","Why","Other"],
         "teacher_solicitation":["How","What","Why","Other"],
         "explicit_evaluation":["Yes","No"]
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
      if(options["student_char"]=="age")
      {
         target="subjAge";
      }
      else if(options["student_char"]=="gender")
      {
         target="subjGender";
      }
      else
      {
         target="subjRace";
      }
      var datas=[];
      for(i=0;i<subject_info[options["student_char"]].length;i++) //loop for each bar
      {
         var data2=[];
         for(j=0;j<sequence_info[options["sequence_val"]].length;j++) //loop for each bar
         {
            data2.push(j-i+7);
         }
         datas.push(data2);
      }


/*
      for(i=0;i<sequences.length;i++)
      {
         subj_id = sequences[i]["subjId"];
         subject = Subjects.find({"_id":subj_id}).fetch();
         console.log(subject);
         for(j=0;j<subject_info[options["student_char"]].length;j++)
         {
          //  console.log(subject_info[options["student_char"]][subject[0][target]]);
         }
      }*/
      var data = {
        labels: sequence_info[options["sequence_val"]],
        series: datas
      };

      var options = {
        seriesBarDistance: 10
      };

      new Chartist.Bar('.ct-chart', data, options);
         }

});

