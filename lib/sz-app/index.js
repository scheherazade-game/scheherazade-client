import can from "can";
import "can/map/define/define";

import template from "./template.stache!";
import "./styles.less!";

export var Model = can.Map.extend({
});

export var Component = can.Component.extend({
    tag: "sz-app",
	template: template,
    scope: Model,
	events: {
		inserted: function() {

		}
	}
});
