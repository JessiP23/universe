import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function MyApp() {
  useEffect(() => {
    //create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(160, 40, 0)

    const canvas = document.getElementById('myCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    //star background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.1});
    const starsCount = 3100;
    const starsPositions = new Float32Array(starsCount * 3);

    for(let i = 0; i < starsCount; i++){
      //position of stars
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;

      starsPositions[i * 3] = x;
      starsPositions[i * 3 + 1] = y;
      starsPositions[i * 3 + 2] = z;
    }
    //update vertices and components
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    //improve resolution in other devices
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //illuminate all objects in scene
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    //sunlight
    const pointLight = new THREE.PointLight(0xFFFFFF, 5000, 1000);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    //interaction between camera and dom elements
    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    control.dampingFactor = 0.25;
    control.screenSpacePanning = false;
    control.maxPolarAngle = Math.PI; 


    function createPlanet(radius, texturePath, positionX, positionY, positionZ, rotationSpeed, orbitSpeed) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(texturePath);
      const geometry = new THREE.SphereGeometry(radius, 100, 100);
      const material = new THREE.MeshPhongMaterial({ map: texture });
      const planet = new THREE.Mesh(geometry, material);
      
      //determine planets position
      planet.position.set(positionX, positionY, positionZ);

      //planets group accomplishing conditions above
      const planetGroup = new THREE.Group();
      planetGroup.add(planet);
      scene.add(planetGroup);

      return {
        obj: planetGroup,
        mesh: planet,
        rotationSpeed,
        orbitSpeed,
      };
    }

    //planet's rings path
    function planetOrbit(radius, segments) {
      const orbitGeometry = new THREE.BufferGeometry();
      //path properties
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 'white' });
      //vertex positions
      const positions = [];

      //move planets based on their segments
      for (let numberOfSegments = 0; numberOfSegments <= segments; numberOfSegments++) {
        const angleBetweenSegments = (numberOfSegments / segments) * Math.PI * 2;
        const positionX = radius * Math.cos(angleBetweenSegments);
        const positionY = radius * Math.sin(angleBetweenSegments);
        positions.push(positionX, positionY, 0);
      }
      //set vertex positions
      orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
    
      scene.add(orbit);
      return orbit;
    }

    //planet's orbits
    const mercuryPath = planetOrbit(35,100, new THREE.Vector3(0,0,0));
    const venusPath = planetOrbit(41,100, new THREE.Vector3(0,0,0));
    const earthPath = planetOrbit(50,100, new THREE.Vector3(0,0,0));
    const marsPath = planetOrbit(55,100, new THREE.Vector3(0,0,0));
    const jupiterPath = planetOrbit(70,100, new THREE.Vector3(0,0,0));
    const saturnPath = planetOrbit(98,100, new THREE.Vector3(0,0,0));
    const uranusPath = planetOrbit(120,100, new THREE.Vector3(0,0,0));
    const neptunePath = planetOrbit(130,100, new THREE.Vector3(0,0,0));

    // Create planets
    const mercury = createPlanet(1, './src/images/mercury_texture.jpg', 35, 0, 0, 0.004, 0.03);
    const venus = createPlanet(1.4, './src/images/venus_texture.jpg', 41, 0, 0, 0.002, 0.02);
    const earth = createPlanet(1.7, './src/images/earth_texture.jpg', 50, 0, 0, 0.002, 0.01);
    const mars = createPlanet(1.3, './src/images/mars_texture.jpg', 55, 0, 0, 0.018, 0.006);
    const jupiter = createPlanet(9, './src/images/jupiter_texture.jpg', 70, 0, 0, 0.004, 0.002);
    const saturn = createPlanet(8, './src/images/saturn_texture.jpg', 98, 0, 0, 0.038, 0.0008);

    //rings Saturn
    const ringGeometry = new THREE.TorusGeometry(14, 2, 2, 100);
    const textureRing = new THREE.TextureLoader().load('./src/images/ringSaturn_texture.jpg');
    const ringMaterial = new THREE.MeshPhongMaterial({ map: textureRing });
    textureRing.rotation = Math.PI / 2;
    const ringSaturn = new THREE.Mesh(ringGeometry, ringMaterial);
    ringSaturn.rotation.x = Math.PI / 3;
    ringSaturn.position.set(98,0,0);
    saturn.obj.add(ringSaturn);

    //uranus planet
    const uranus = createPlanet(4, './src/images/uranus_texture.jpg', 120, 0, 0, 0.003, 0.0004);

    //uranus ring
    const uranusRingGeometry = new THREE.TorusGeometry(5, 0.1, 2, 100);
    const uranusTexture = new THREE.TextureLoader().load('./src/images/uranus_ring.jpg');
    const uranusRingMaterial = new THREE.MeshPhongMaterial({ map: uranusTexture });
    uranusTexture.rotation = Math.PI / 2;
    const uranusRing = new THREE.Mesh( uranusRingGeometry, uranusRingMaterial);
    uranusRing.position.set(120,0,0);
    uranus.obj.add(uranusRing);

    //Neptune
    const neptune = createPlanet(3.94, './src/images/neptune_texture.jpg', 130, 0, 0, 0.032, 0.0001);
    //Neptune's Ring
    const ringNeptuneGeometry = new THREE.TorusGeometry(4.5, 0.1, 2, 100);
    const ringNeptuneTexture = new THREE.TextureLoader().load('./src/images/neptune_rings.jpg');
    const ringNeptuneMaterial = new THREE.MeshPhongMaterial({ map: ringNeptuneTexture });
    ringNeptuneTexture.rotation = Math.PI;
    const ringNeptune = new THREE.Mesh(ringNeptuneGeometry, ringNeptuneMaterial);
    ringNeptune.rotation.x = Math.PI / 8;
    ringNeptune.position.set(130,0,0);
    neptune.obj.add(ringNeptune);

    //sun
    const textureSun = new THREE.TextureLoader().load('./src/images/sun_texture.jpg')
    const sunGeometry = new THREE.SphereGeometry(30, 100, 100);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: textureSun });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    function animate() {
      //Rotation & Position of each planet
      sun.rotation.y += 0.01;

      // Rotate each planet around its own axis
      mercury.mesh.rotation.y += mercury.rotationSpeed;
      venus.mesh.rotation.y += venus.rotationSpeed;
      earth.mesh.rotation.y += earth.rotationSpeed;
      mars.mesh.rotation.y += mars.rotationSpeed;
      jupiter.mesh.rotation.y += jupiter.rotationSpeed;
      saturn.mesh.rotation.y += saturn.rotationSpeed;
      uranus.mesh.rotation.y += uranus.rotationSpeed;
      neptune.mesh.rotation.y += neptune.rotationSpeed;

      // Rotate each planet around the sun
      mercury.obj.rotation.y += mercury.orbitSpeed;
      venus.obj.rotation.y += venus.orbitSpeed;
      earth.obj.rotation.y += earth.orbitSpeed;
      mars.obj.rotation.y += mars.orbitSpeed;
      jupiter.obj.rotation.y += jupiter.orbitSpeed;
      saturn.obj.rotation.y += saturn.orbitSpeed;
      uranus.obj.rotation.y += uranus.orbitSpeed;
      neptune.obj.rotation.y += neptune.orbitSpeed;

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // cleanup
    return () => {
      window.removeEventListener('resize', () => { });
      control.dispose();
      //stops animation associated with rendered
      renderer.setAnimationLoop(null);
    };
  }, []); 

  return (
    <div>
      <canvas id="myCanvas" />
    </div>
  );
}

export default MyApp;
