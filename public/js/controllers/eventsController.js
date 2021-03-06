angular
.module('myMoments')
.controller('EventsController', EventsController);

EventsController.$inject = ['Event', '$scope', '$http', 'CurrentUser', '$stateParams', '$state', 'Upload'];
function EventsController(Event, $scope, $http, CurrentUser, $stateParams, $state, Upload){

  var self            = this;

  self.events         = [];
  self.event          = {};
  self.selectedEvent  = {};
  self.test = "opop"

  self.file = null;

  self.createEvent    = createEvent;
  self.removeEvent    = removeEvent;

  

  this.uploadSingle = function() {
    console.log(self.file);
    Upload.upload({
      url: 'api/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      // self.event.profilePhoto = res.data.filename;
      self.event.profilePhoto = "yyyy";
      self.event.profilePhoto = res.data.filename;
    })
    .catch(function(err) {
      console.error(err);
    });
  }




 
  self.save = function() {

    console.log(self.data);

    self.data.$update(function(err , data){
      console.log(err , data);
    });
  }


  function createEvent(){
   self.currentUser  = CurrentUser.getUser();
   self.event.user   = self.currentUser._id;
   console.log(self.event)
   $http.post("/api/events/" , {event: self.event}, function(data) {
     console.log("success");
   });
   $state.go('user',  { id: CurrentUser.getUser()._id} );
  }

 function removeEvent(event){
  Event.delete({ id: event._id}), function() {
      var index = self.events.indexOf(event);
      self.events.splice(index, 1);
    }
  }
}
