import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      //create map
      let map = am4core.create("mapdiv", am4maps.MapChart);
      map.geodata = am4geodata_worldLow;
      map.projection = new am4maps.projections.Miller();
      map.homeZoomLevel = 2.5;
      map.homeGeoPoint = {
        latitude: 38,
        longitude: -60
      };
  
      //Create map polygon series
      let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.mapPolygons.template.fill = map.colors.getIndex(0).lighten(0.5);
      polygonSeries.exclude = ["AQ"];
  
      // Add line bullets
      let cities = map.series.push(new am4maps.MapImageSeries());
      cities.mapImages.template.nonScaling = true;
  
      let city = cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 6;
      city.fill = map.colors.getIndex(0).brighten(-0.2);
      city.strokeWidth = 2;
      city.stroke = am4core.color("#fff");
  
      function addCity(coords, title) {
          let city = cities.mapImages.create();
          city.latitude = coords.latitude;
          city.longitude = coords.longitude;
          city.tooltipText = title;
          return city;
      }
  
      let paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
      let toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");
  
      // Add lines
      let lineSeries = map.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.stroke = am4core.color("#fff");
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";

    function addLine(from, to) {
        let line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = 0;

        return line;
    }

    addLine(paris, toronto);

    let currentLine = 0;
    let direction = 1;
    function fly() {

        // Set up animation
        let from, to;
        if (direction == 1) {
            from = 0
            to = 1;
            if (lineSeries.rotation != 0) {
              lineSeries.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", fly);
                return;
            }
        }

        // Start the animation
        let animation = lineSeries.animate({
            from: from,
            to: to,
            property: "position"
        }, 1000, am4core.ease.sinInOut);
        animation.events.on("animationended", fly)



    // Add plane
    // let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    // plane.position = 0;
    // plane.width = 48;
    // plane.height = 48;

    // plane.adapter.add("scale", (scale, target) => {
    //     return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    // })

    // let planeImage = plane.createChild(am4core.Sprite);
    // planeImage.scale = 0.08;
    // planeImage.horizontalCenter = "middle";
    // planeImage.verticalCenter = "middle";
    // planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    // planeImage.fill = map.colors.getIndex(2).brighten(-0.2);
    // planeImage.strokeOpacity = 0;

    // Plane animation
    // let currentLine = 0;
    // let direction = 1;
    // function flyPlane() {

    //     // Get current line to attach plane to
    //     plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
    //     plane.parent = lineSeries;

    //     // Set up animation
    //     let from, to;
    //     if (direction == 1) {
    //         from = 0
    //         to = 1;
    //         if (planeImage.rotation != 0) {
    //             planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
    //             return;
    //         }
    //     }

    //     // Start the animation
    //     let animation = plane.animate({
    //         from: from,
    //         to: to,
    //         property: "position"
    //     }, 1000, am4core.ease.sinInOut);
    //     animation.events.on("animationended", flyPlane)
          /*animation.events.on("animationprogress", function(ev) {
            let progress = Math.abs(ev.progress - 0.5);
            //console.log(progress);
            //planeImage.scale += 0.2;
          });*/
  
          // Increment line, or reverse the direction
          
  
      }
  
      //Go!
    //  flyPlane();
  }

}
