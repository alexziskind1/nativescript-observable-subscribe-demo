var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
require( "./node_modules/nativescript-observable-subscribe/observablesubscribe" );
var counterPropName = 'counter';
var messagePropName = 'message';
var switchPropName = 'switchState';


var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.set(counterPropName, 42);
        this.set(messagePropName, this.counter + " taps left");
        this.set(switchPropName, false);
        
        function counterPropChangedHandler(changeObj){
            var currentCount = this.get(counterPropName);
            if (currentCount <= 0) {
                this.set(messagePropName, "Hoorraaay! You unlocked the NativeScript clicker achievement!");
            }
            else {
                this.set(messagePropName, currentCount + " taps left");
            }
        }
        
        this.subscribe(counterPropName, counterPropChangedHandler, this);
        
        this.subscribe(switchPropName, function(changeObj){
            if (changeObj.value) 
                this.unsubscribe(counterPropName, counterPropChangedHandler);
            else {
                this.subscribe(counterPropName, counterPropChangedHandler, this);   
                counterPropChangedHandler.call(this);
            }
        }, this);
        
    }
    HelloWorldModel.prototype.tapAction = function () {
        this.set(counterPropName, this.get(counterPropName)-1);
    };
    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
