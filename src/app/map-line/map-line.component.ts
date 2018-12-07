import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-map-line',
  templateUrl: './map-line.component.html',
  styleUrls: ['./map-line.component.scss']
})
export class MapLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //create map
    let map = am4core.create("mapdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    //Create map polygon series
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = map.colors.getIndex(0).lighten(0.5);
    polygonSeries.exclude = ["AQ"];

    // Add line bullets
    let cities = map.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    let radiusCurrent = 3;
    let radiusAfter = 7;



    let city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 5;
    city.fill = map.colors.getIndex(0).lighten(0.5);
    city.strokeWidth = 3;
    city.stroke = am4core.color("#000");
    city.applyOnClones = true;

    function addCity(coords, title) {
        let city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
    }

    let paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
    let toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");

    let sourceCity = [paris];
    let targetCity = [toronto];

    function bling(){
        let from,to;
            from = radiusCurrent;
            to = radiusAfter;
        
        let animation = city.animate({
            from: from,
            to: to,
            property: "radius"
        },1500, am4core.ease.linear);
        animation.events.on("animationended", bling);
    }

    // Add lines
    let lineSeries = map.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.strokeOpacity = 0;

    function addLine(from, to) {
        let line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = 0;

        return line;
    }

    addLine(paris, toronto);

    // Add plane
    let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    plane.position = 0;

    plane.adapter.add("scale", (scale, target) => {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    })

    let planeImage = plane.createChild(am4core.Sprite);
    planeImage.scale = 0.5;
    planeImage.horizontalCenter = "middle";
    planeImage.verticalCenter = "middle";
    planeImage.path = "M10 10 H 200 V 20 H 10";
    planeImage.fill = map.colors.getIndex(2).brighten(-0.2);
    planeImage.strokeOpacity = 0;
    planeImage.width = 30;
    planeImage.height = 30;

    // Plane animation
    let currentLine = 0;
    let direction = 1;
    function flyPlane() {

        // Get current line to attach plane to
        plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
        plane.parent = lineSeries;

        // Set up animation
        let from, to;
        if (direction == 1) {
            from = 0
            to = 1;
        }

        // Start the animation
        let animation = plane.animate({
            from: from,
            to: to,
            property: "position"
        }, 1500, am4core.ease.quadIn);
        animation.events.on("animationended", flyPlane)
        /*animation.events.on("animationprogress", function(ev) {
          let progress = Math.abs(ev.progress - 0.5);
          //console.log(progress);
          //planeImage.scale += 0.2;
        });*/

    }

    // Go!
    flyPlane();
    bling();
  }
}
