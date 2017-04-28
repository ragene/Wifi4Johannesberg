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
	var scaleLine = new ol.control.ScaleLine({className: "ol-scale-line", target: document.getElementById('scale-line')})	
	console.log(scaleLine)
	var map = new ol.Map({
		controls: ol.control.defaults({
			attributionOptions: /** @type {olx.control.AttributionOptions} */ ({collapsible: false})
		}).extend([
			scaleLine
		]),
		target: 'map',
		overlay: [hotspot],
		layers: [
		  new ol.layer.Tile({
			source: new ol.source.OSM()
		  }), vectorLayer
		],
		view: new ol.View({
		  center: ol.proj.transform([9.13, 50.02], 'EPSG:4326', 'EPSG:3857'),
		  zoom: 14,
		  projection: "EPSG:3857"
		})
	});
	var element = document.getElementById('hotspot');

	var hotspot = new ol.Overlay({
	  element: element,
	  positioning: 'bottom-center',
	  stopEvent: false
	});

	map.addOverlay(hotspot);
	
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.transform([9.137706756591797, 50.02938523179295], 'EPSG:4326', 'EPSG:3857'))
	});
	
	var center = [9.137706756591797, 50.02938523179295]
	var radius = 12
	var edgeCoordinate = [center[0] + radius, center[1]];
	var wgs84Sphere = new ol.Sphere(6378137);
	var groundRadius = wgs84Sphere.haversineDistance(
		ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326'), 
		ol.proj.transform(edgeCoordinate, 'EPSG:3857', 'EPSG:4326')
	);
	var newCircle = new ol.style.Circle({
		fill: new ol.style.Fill({color: 'green', opacity: 0.5}),
		radius: groundRadius,
		center: [9.137706756591797, 50.02938523179295],
	});
	var iconStyle =  new ol.style.Style({
		image: newCircle
	})
	
	
	//iconStyle.setZIndex(0)
	iconFeature.setStyle(iconStyle);
	vectorSource.addFeature(iconFeature)
});