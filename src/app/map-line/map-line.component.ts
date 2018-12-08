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
     let cities1 = map.series.push(new am4maps.MapImageSeries());
     cities1.mapImages.template.nonScaling = true;
     let cities2 = map.series.push(new am4maps.MapImageSeries());
     cities2.mapImages.template.nonScaling = true;
 
     let radiusCurrent = 3;
     let radiusAfter = 10;
 
     let strokeCurrent = am4core.color("#000");
     let strokeAfter = map.colors.getIndex(0).lighten(0.5);
 
     let citySource = cities1.mapImages.template.createChild(am4core.Circle);
     citySource.radius = 5;
     citySource.fill = map.colors.getIndex(0).lighten(0.5);
     citySource.strokeWidth = 3;
     citySource.stroke = strokeCurrent;
     citySource.applyOnClones = true;

     let cityTarget = cities2.mapImages.template.createChild(am4core.Circle);
     cityTarget.radius = 5;
     cityTarget.fill = map.colors.getIndex(0).lighten(0.5);
     cityTarget.strokeWidth = 3;
     cityTarget.stroke = strokeCurrent;
     cityTarget.applyOnClones = true;
 
     function addCitySource(coords) {
         let citySource = cities1.mapImages.create();
         citySource.latitude = coords.latitude;
         citySource.longitude = coords.longitude;
         return citySource;
     }

     function addCityTarget(coords) {
      let cityTarget = cities2.mapImages.create();
      cityTarget.latitude = coords.latitude;
      cityTarget.longitude = coords.longitude;
      return cityTarget;
  }
 
     let paris = addCitySource({ "latitude": 48.8567, "longitude": 2.3510 });
     let toronto = addCityTarget({ "latitude": 43.8163, "longitude": -79.4287 });
 
    // Animation of source city
     function hiddenCitySource(){
         let from, to;
             from = strokeCurrent;
             to = strokeAfter;
         let animation = citySource.animate({
             from: from,
             to: to,
             property: "stroke"
         },100, am4core.ease.linear);
     }
 
     function blingCitySource(){
         let from,to;
             from = radiusCurrent;
             to = radiusAfter;
         
         let animation = citySource.animate({
             from: from,
             to: to,
             property: "radius"
         },500, am4core.ease.linear);
         animation.events.on("animationended", hiddenCitySource);// sau khi kết thúc event thì làm gì
     }

     function backStrokeCitySource(){
      let from,to
        from = strokeAfter
        to = strokeCurrent
      let animation = citySource.animate({
        from: from,
        to: to,
        property: "stroke"
      },1, am4core.ease.linear);
      animation.events.on("animationended", blingCitySource);
    }


     
     //animation of target city

     function hiddenCityTarget(){
      let from, to;
          from = strokeCurrent;
          to = strokeAfter;
      let animation = cityTarget.animate({
          from: from,
          to: to,
          property: "stroke"
      },100, am4core.ease.linear);
    }

    function blingCityTarget(){
      let from,to;
          from = radiusCurrent;
          to = radiusAfter;
      
      let animation = cityTarget.animate({
          from: from,
          to: to,
          property: "radius"
      },1500, am4core.ease.linear);
      animation.events.on("animationended", hiddenCityTarget);// sau khi kết thúc event thì làm gì
    }

    function backStrokeCityTarget(){
      let from,to
        from = strokeAfter
        to = strokeCurrent
      let animation = cityTarget.animate({
        from: from,
        to: to,
        property: "stroke"
      },1, am4core.ease.linear);
      animation.events.on("animationended", blingCityTarget);
    }
 
     
     
 
     // Add lines
     let lineSeries = map.series.push(new am4maps.MapArcSeries());
     lineSeries.mapLines.template.line.strokeOpacity = 0;
     function addLine(from, to) {
         let line = lineSeries.mapLines.create();
         line.imagesToConnect = [from, to];
         line.line.controlPointDistance = -0.3;
 
         return line;
     }
 
     addLine(paris, toronto);
 
     // Add plane
     let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
     plane.position = 0;
 
     plane.adapter.add("scale", (scale, target) => {
         return 0.5 * (1 - (Math.abs(0.5 - target.position)));
     })
 
     let currentPlaneFill = map.colors.getIndex(2).brighten(-0.2);
     let afterPlaneFill = map.colors.getIndex(0).lighten(0.5);
 
     let planeImage = plane.createChild(am4core.Sprite);
     planeImage.scale = 0.5;
     planeImage.horizontalCenter = "right";
     planeImage.verticalCenter = "middle";
     planeImage.path = "M10 10 H 200 V 20 H 10";
     planeImage.fill = currentPlaneFill;
     planeImage.strokeOpacity = 0;
     planeImage.width = 30;
     planeImage.height = 30;
 
     
     // Plane animation
     let currentLine = 0;
     let direction = 1;

     function backFillPlane(){
        let from, to
          from = afterPlaneFill
          to = currentPlaneFill
          let animation = planeImage.animate({
            from: from,
            to: to,
            property: "fill"
        },1, am4core.ease.quadIn); 
     }

     function backPositionPlane(){
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
      }, 1, am4core.ease.quadIn);
     }
 
     function hiddenPlane(){
         let from, to
            from = currentPlaneFill
            to = afterPlaneFill
         let animation = planeImage.animate({
             from: from,
             to: to,
             property: "fill"
         },100, am4core.ease.quadIn);
         animation.events.on("animationended", backPositionPlane);
     }
 
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
         animation.events.on("animationended", hiddenPlane)
         /*animation.events.on("animationprogress", function(ev) {
           let progress = Math.abs(ev.progress - 0.5);
           //console.log(progress);
           //planeImage.scale += 0.2;
         });*/
         
     }
 
     // Go!
  
 
     document.getElementById('mapdiv').addEventListener('click', function(){
         flyPlane();
         blingCitySource();
         blingCityTarget();
         backFillPlane();
         backStrokeCityTarget();
         backStrokeCitySource();
     });
    }
}
