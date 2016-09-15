"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable_1 = require('data/observable');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.message = 'contacts-picker';
    }
    HelloWorldModel.prototype.pickit = function () {
        global.tnsconsole.log('pickit');
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBb0MzQztJQUFxQyxtQ0FBVTtJQUc5QztRQUNDLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFnQmhDLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUExQkQsQ0FBcUMsdUJBQVUsR0EwQjlDO0FBMUJZLHVCQUFlLGtCQTBCM0IsQ0FBQSJ9