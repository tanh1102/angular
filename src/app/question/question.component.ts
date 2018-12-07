import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { throwError } from 'rxjs';
import { svg } from 'd3';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var WIDTH = 960;
    var HEIGHT = 580;
    var TRANS_DURATION = 1500;
    var COLORS = [
      'rgb(255, 179, 186)',
      'rgb(255, 223, 186)',
      'rgb(255, 255, 186)',
      'rgb(186, 255, 201)',
      'rgb(186, 255, 255)'
    ];

    function rndRange(min, max) {
      return Math.floor(Math.random() * (max - min +1) + min);
    };

    function unitVector(x1, y1, x2 , y2){
      var v = [x2-x1, y2-y1];
      var norm = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
      return [v[0]/norm, v[1]/norm];
    };


    /* map */

    d3.json("./world-110m.json"), (error, world) => {
      if (error) throw error;

      var countries = topojson.feature(world, world.object.countries).feature;

      
    }








  }
}
