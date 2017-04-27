// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require ol

$(document).ready(function(){
	//var points = $.makeArray($('#map').attr("value"));
	//var coord = $(points)[0].split(",");
	//console.log(coord);
	var vectorSource = new ol.source.Vector({});



	var vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});



		
	var map = new ol.Map({
		target: 'map',
		//overlay: [popup],
		layers: [
		  new ol.layer.Tile({
			source: new ol.source.OSM()
		  }), vectorLayer
		],
		view: new ol.View({
		  center: ol.proj.transform([11.57, 48.13], 'EPSG:4326', 'EPSG:3857'),
		  zoom: 7
		})
	});
});