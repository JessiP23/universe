import { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function MyApp() {
  useEffect (() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth/window.innerHeight,
      0.1, 
      10000
    );
    camera.position.z = 130;

    const canvas = document.getElementById('myThreeCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas, 
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    //add to html
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0,64,32);
    scene.add(spotLight);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    control.dampingFactor = 0.25;
    control.screenSpacePanning = false;
    control.maxPolarAngle = Math.PI/2;

    //sun
    const sunGeometry = new THREE.SphereGeometry(20,16,16);
    const sunMaterial = new THREE.MeshNormalMaterial();
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    //Mercury
    const mercuryGeomery = new THREE.SphereGeometry(1,10,10);
    const mercuryMaterial = new THREE.MeshNormalMaterial();
    const mercury = new THREE.Mesh(mercuryGeomery, mercuryMaterial);
    scene.add(mercury); 

    //venus
    const venusGeometry = new THREE.SphereGeometry(1.4,10,10);
    const venusMaterial = new THREE.MeshNormalMaterial();
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    scene.add(venus);

    //earth
    const earthGeometry = new THREE.SphereGeometry(1.7,10,10);
    const earthMaterial = new THREE.MeshNormalMaterial();
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    //mars 
    const marsGeometry = new THREE.SphereGeometry(1.3,10,10);
    const marsMaterial = new THREE.MeshNormalMaterial();
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);

    //Jupiter
    const jupiterGeometry = new THREE.SphereGeometry(9,10,10);
    const jupiterMaterial = new THREE.MeshNormalMaterial();
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);

    const saturnGeometry = new THREE.SphereGeometry(8,10,10);
    const saturnMaterial = new THREE.MeshNormalMaterial();
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    scene.add(saturn);

    const uranusGeometry = new THREE.SphereGeometry(4,10,10);
    const uranusMaterial = new THREE.MeshNormalMaterial();
    const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    scene.add(uranus);

    const neptuneGeometry = new THREE.SphereGeometry(3.94, 10, 10);
    const neptuneMaterial = new THREE.MeshNormalMaterial();
    const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    scene.add(neptune);

    const animate = () =>{
      sun.rotation.x += 0.01;
      sun.rotation.y += 0.01;
      sun.position.set(0,0,0);

      mercury.position.set(25,0,0);
      mercury.rotation.x += 0.01;
      mercury.rotation.y += 0.01;

      venus.rotation.x += 0.01;
      venus.rotation.y += 0.01;
      venus.position.set(31,0,0);

      earth.rotation.x += 0.01;
      earth.position.y += 0.01;
      earth.position.set(40,0,0);

      mars.rotation.x += 0.01;
      mars.rotation.y += 0.01;
      mars.position.set(45,0,0);

      jupiter.rotation.x += 0.01;
      jupiter.rotation.y += 0.01;
      jupiter.position.set(60,0,0);

      saturn.rotation.x += 0.01;
      saturn.rotation.y += 0.01;
      saturn.position.set(84,0,0);

      uranus.rotation.x += 0.01;
      uranus.rotation.y += 0.01;
      uranus.position.set(103,0,0);

      neptune.rotation.x += 0.01;
      neptune.rotation.y += 0.01;
      neptune.position.set(115,0,0);

      control.update();
      renderer.render(scene,camera);
      window.requestAnimationFrame(animate);

    };
    animate();
    return() =>{
      control.dispose();
    };
  }, []);

  return (
    <div>
      <canvas id='myThreeCanvas'/>
    </div>
  )
}

export default MyApp;
