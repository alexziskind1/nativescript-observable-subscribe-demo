var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var counterPropName = 'counter'; 
var messagePropName = 'message';

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.counter = 42;
        this.set(messagePropName, this.counter + " taps left");
        
        function propChangedHandler(changeObj){
            if (changeObj.propertyName == counterPropName) {
                var currentCount = this.get(counterPropName);
                if (currentCount <= 0) {
                    this.set(messagePropName, "Hoorraaay! You unlocked the NativeScript clicker achievement!");
                }
                else {
                    this.set(messagePropName, currentCount + " taps left");
                }
            }
        }
        
        this.addEventListener(observable.Observable.propertyChangeEvent, propChangedHandler, this);
    }
    HelloWorldModel.prototype.tapAction = function () {
        this.set(counterPropName, this.get(counterPropName)-1);
    };
    
    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
