import $ from "jquery";
import "Ripple.js/dist/ripple.css";
import "Ripple.js/dist/ripple.js";

/**
 * Globally set material-specific stuff.
 *
 * TODO - scope it within the app better?
 */
$(() => {
  $.ripple(".btn,.navbar-toggle");
});
