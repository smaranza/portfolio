import * as THREE from '@three';
import gsap from "@gsap";
import Random from '../utils/randomUtil.js';
import { MathUtils } from '@three';

export default class BackgroundLines {
  constructor(options) {
    this.defaultOptions = {
      'count': 1200,
      'range': 50
    }
  
    this.parameters = $.extend(this.defaultOptions, options);


    this.group = new THREE.Group();
    this.line = this.getLine();
    
    let random = new Random();
    
    for (var i = 0; i < this.parameters.count; i++) {
      let lineCopy = this.line.clone();

      lineCopy.position.x = random.value(-(this.parameters.range), this.parameters.range * 2);
      lineCopy.position.y = random.value(-(this.parameters.range), this.parameters.range);
      lineCopy.position.z = random.value(-(this.parameters.range), this.parameters.range / 2);
      lineCopy.scale.y = 0;
      this.group.add(lineCopy);
    }
  }

  getLine() {
    let points = [];

    points.push(new THREE.Vector3(0, 0.1, 0));
    points.push(new THREE.Vector3(0, 0, 0));
    
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    let material = new THREE.LineBasicMaterial({ color: 0xf6f6f6 });

    return this.line = new THREE.Line(geometry, material);
  }

  in(duration) {   
    for (let o = 0; o < this.group.children.length; o++) {
      let line = this.group.children[o];
      line.rotation.x = 0;

      gsap.to(line.scale, { 
      y: 30 ,
        duration: duration / 2,
        ease: 'power4.out'
      });

      gsap.to(line.scale, { 
        y: 0 ,
        duration: duration / 2,
        ease: 'power4.out',
        delay : duration / 2,
      });
    }
  }

  intro(duration = 4) {
    for (let o = 0; o < this.group.children.length; o++) {
      let line = this.group.children[o];
      line.rotation.x = MathUtils.degToRad(-90);
      gsap.to(line.scale, { 
        y: 200 ,
        duration: 4,
        ease: 'power4.out'
      });

      gsap.to(line.scale, { 
        y: 0 ,
        duration: 2,
        ease: 'power4.out',
        delay : 2,
        onComplete: function() {
          line.rotation.x = 0;
        }
      });
    }
  }

  update() {
    for (let o = 0; o < this.group.children.length; o++) {
      let line = this.group.children[o];
      line.geometry.attributes.position.needsUpdate = true;
      line.geometry.computeBoundingBox();
    }
  }
}