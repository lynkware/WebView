
//$(document).ready(function () {
//  document.addEventListener("deviceready", onDeviceReady, false);
//});

var application;

function initializeViewModel() {
  // create the view model
  application = new ApplicationViewModel();

  application.currentViewModel.subscribe(function (viewModel) {
    if (viewModel !== undefined) {
      $("#app").empty();
      $("#" + viewModel.template).tmpl("").appendTo("#app");
      ko.applyBindings(viewModel);
    }
  });

  application.backButtonRequired.subscribe(function (backButtonRequired) {
    if (backButtonRequired) {
      document.addEventListener("backbutton", onBackButton, false);
    } else {
      document.removeEventListener("backbutton", onBackButton, false);
    }
  });

  application.navigateTo(new TwitterSearchViewModel());

  window.external.Notify("getState");


//  $(document).scroll(function () {
//    if (!vm.selectedTweet()) {
//      vm.scrollPosition = $(document).scrollTop();
//    }
//  });
}

//function onDeviceReady() {
//  initializeViewModel();
//}

function onBackButton() {
  application.back();
}

// returns the view model state
function getState() {
  return application.getState();
}

// sets the view model state
function setState(state) {
  application.setState(state);
}

