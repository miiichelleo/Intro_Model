import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//scene
const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const size = 5;
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
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setClearColor(0x000000, 0);
document.body.appendChild( renderer.domElement );

//model
const loader = new GLTFLoader();
loader.load('/Intro.glb', function ( gltf ) {
  scene.add(gltf.scene );
}, undefined, function ( error ) {
  console.error( error );
} );

//camera
camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0);

//Lighting
const ambient = new THREE.HemisphereLight(0xffffff, 0x2f2f2f, 1);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1.4);
directional.position.set(3, 6, 4);
scene.add(directional);


function animate( time ) {
  renderer.render( scene, camera );
}

