import can from "can";
import "can/map/define/define";

import template from "./template.stache!";
import "./styles.less!";

export var Scope = can.Map.extend({
});

export var Component = can.Component.extend({
    tag: "example-component",
	template: template,
    scope: Scope,
	events: {
		inserted: function() {

		}
	}
});
