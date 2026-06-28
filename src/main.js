import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//scene
const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const size = 5.5;


const camera = new THREE.OrthographicCamera(
  -size * aspect,
   size * aspect,
   size,
  -size,
   1,
   1000
);

//renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0);
camera.zoom = 2;
camera.setViewOffset(
    window.innerWidth,
    window.innerHeight,
    -600,       // x offset
    20,    // y offset
    window.innerWidth,
    window.innerHeight
);
camera.updateProjectionMatrix();


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop(animate);
renderer.setClearColor(0x000000, 0.9);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
//material
const material = new THREE.MeshPhongMaterial({
  color: 0xc8c8c8,
  flatShading: true,
  shininess: 0,
});

//Lighting
const ambient = new THREE.HemisphereLight(0xffffff, 0x888888, 1.8);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 2.0);
directional.position.set(5, 10, -2);
directional.castShadow = true;

scene.add(directional);

// Ground shadow
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.ShadowMaterial({ opacity: 0.15 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function animate() {
  renderer.render( scene, camera );
}


//model
const loader = new GLTFLoader();
loader.load('/Intro.glb', function ( gltf ) {
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material;

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  
  //animation

  scene.add(gltf.scene);
}, undefined, function ( error ) {
  console.error(error);
} );
