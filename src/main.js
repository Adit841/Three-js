import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene();


// const clock = new THREE.Clock();

const timer = new THREE.Timer();


// 3D-object - mesh

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// material 
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// camera

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);

// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100);

camera.position.z = 3;
camera.lookAt(0,0,0);
// renderer

const canvas = document.querySelector('#webgl');

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


window.addEventListener('resize', () => {
  // update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})




function animate() {
  timer.update();
  controls.update();
  const delta  = timer.getDelta();
  cube.rotation.x += delta ;
  cube.rotation.y += delta ;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}
renderer.render(scene, camera);// to start renderer


animate();