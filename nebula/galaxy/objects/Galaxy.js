import * as THREE from '@three';
import gsap from "@gsap";
import { MathUtils } from '@three';

export default class Galaxy {
  constructor(options) {
    this.defaultOptions = {
      "ringFromColor": '#ffffff',
      "ringToColor": '#333333',
      "ringDivisions": 100,
      "ringColorSteps": 30
    }

    this.parameters = $.extend(this.defaultOptions, options);
    
    gsap.defaults({
      duration: 4,
      ease: "power4.inOut"
    });
    
    this.status;
    this.setStatus('init');
    this.cache = .005;
    this.group = new THREE.Group();
    
    let ring = this.getRing();
    let planet = this.getPlanet();

    this.colors = {
      'navy': 0x2978E0,
      'amethyst': 0xAB68DF,
      'aquamarine': 0x41D39E,
      'blush': 0xF1507B
    }

    let radius = [ 4, 10, 18, 23, ];
    let planets = {
      4: { 
        el: planet.clone(),
        scale: 0.2,
        increment: 0.03,
        color: this.colors.amethyst 
      },
      10: { 
        el: planet.clone(),
        scale: 0.5,
        increment: 0.02,
        color: this.colors.navy 
      },
      18: { 
        el: planet.clone(),
        scale: 0.2,
        increment: 0.035,
        color: this.colors.aquamarine 
      },
      23: { 
        el: planet.clone(),
        scale: 0.07,
        increment: 0.02,
        color: this.colors.blush
      },
      25: { 
        el: planet.clone(),
        scale: 0.2,
        increment: 0.01,
        color: this.colors.navy 
      }
    };


  
    for (var i = 0; i < radius.length ; i++) {
      var ringRadius = radius[i];
      var ringCopy = ring.clone();
      var orbit = new THREE.Group();

      ringCopy.scale.x = ringCopy.scale.y = ringRadius;
      ringCopy.rotation.z = random(0, Math.PI );
  
      orbit.add(ringCopy);
  
      if (planets[ringRadius]) {
        let planetCopy = planets[ringRadius].el;
        var scale = planets[ringRadius].scale;
        
        planetCopy.material = planetCopy.material.clone();
        planetCopy.material.color = new THREE.Color(planets[ringRadius].color);
        
        planetCopy.scale.x = planetCopy.scale.y = planetCopy.scale.z = scale;
  
        // random start theta
        var theta = random(0, 2 * Math.PI);
            // theta = 0;
        var x = ringRadius * Math.cos(theta);
        var y = ringRadius * Math.sin(theta);
        planets[ringRadius].theta = theta;
        planetCopy.position.set(x, y, 0);
        
        orbit.increment = planets[ringRadius].increment;

        orbit.add(planetCopy);
      }

      orbit.rotation.y = random(0, MathUtils.degToRad(35));
      orbit.rotation.x = MathUtils.degToRad(-90);
      this.group.add(orbit);
    }

    // this.cache = { rotationX: 0, rotationY: 0 };

    this.init = true;
  }

  getPlanet() {
    var planetMaterial = new THREE.MeshBasicMaterial();
    var planetGeometry = new THREE.SphereGeometry(5, 20, 20);
    var planet = new THREE.Mesh(planetGeometry, planetMaterial);
  
    return planet;
  }

  getRing() {
    var material = new THREE.LineBasicMaterial({ 
      color: 0xf6f6f6,
      opacity: .4,
      transparent: true
    });

    var step = 2 * Math.PI / this.parameters.ringDivisions;
  
    let points = [];

    for (var i = 0; i < this.parameters.ringDivisions + 1; i++) {
      var theta = i * step;
      var vertex = new THREE.Vector3(1 * Math.cos(theta),1 * Math.sin(theta),  0  );
      points.push(vertex);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    var ring = new THREE.Line(geometry, material);
  
    return ring;
  }

  in(duration = 4) {
    if (this.status !== 'changing') {
      this.setStatus('changing');
   
      gsap.defaults({
        duration : duration,
        ease: 'power4.inOut'
      })

      gsap.to(this.group.position, { y: 0 });
      gsap.to(this.group.rotation, { y : 6.3 });
      gsap.to(this.group.scale, { 
        x: 1, 
        y: 1, 
        z: 1,
        onComplete: () => {
          this.setStatus('in');
          this.resetStatus(true);
        }
      });
    }
  };

  out(duration = 2) {
    if (this.status !== 'changing') {
      this.setStatus('changing');
      
      gsap.defaults({
        duration : duration,
        ease: 'power4.out'
      })
      
      gsap.to(this.group.position, { y : 50 });
      gsap.to(this.group.rotation, { y : 0 });
      gsap.to(this.group.scale, { 
        x: 0.5, 
        y: 0.5, 
        z: 0.5,
        onComplete: () => {
          this.setStatus('out');
          this.resetStatus(false);
        }
      });
    }
  }; 

  setStatus(status) {
    this.status = status.toString();
  }

  resetStatus(inview) {
    let currentY = window.scrollY;
    let currentX = window.scrollX;

    if ((window.scrollY > (window.innerHeight / 2)) == inview) {
      window.scrollTo(currentX, currentY+1);
    }
  }

  update() {
    for (let o = 0; o < this.group.children.length; o++) {
      const orbit = this.group.children[o];
      orbit.rotation.z -= orbit.increment;
    }
    
    // this.group.rotation.y += .001;
    // this.cache = object.rotation.y + increment;
    // this.group.rotation.y += this.cache.rotationX;
  } 
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}