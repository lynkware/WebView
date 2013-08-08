
function ApplicationViewModel() {

  var that = this;

  this.viewModelBackStack = ko.observableArray();

  this.backButtonRequired = ko.dependentObservable(function () {    
    return this.viewModelBackStack().length > 1;
  }, this);

  this.currentViewModel = ko.dependentObservable(function () {
    return this.viewModelBackStack()[this.viewModelBackStack().length-1];
  }, this);

  this.navigateTo = function (viewModel) {
    this.viewModelBackStack.push(viewModel);
  }

  this.back = function () {
    this.viewModelBackStack.pop();
  }

  // gets the view model state as a JSON string
  this.getState = function () {
    var state = ko.observableArray();
    for (var i = 0; i < that.viewModelBackStack().length; i++) {
      var viewModel = that.viewModelBackStack()[i];
      state.push({
        "factoryName" : viewModel.factoryName,
        "viewModel" : viewModel
      })
    }
    return ko.toJSON(state);
  }

  // sets the view model state based on the given JSON string.
  this.setState = function (stateString) {
    var state = $.parseJSON(stateString);

    that.viewModelBackStack.removeAll();
    for (var i = 0; i < state.length; i++) {
      var viewModelState = state[i];
      var factoryName = viewModelState.factoryName;
      var viewModel = window[factoryName](viewModelState.viewModel);
      that.viewModelBackStack.push(viewModel);
    };
  }

}