import './style.css'
import * as THREE from 'three'


// scene
const scene = new THREE.Scene();

// 3D-object - mesh

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// material 
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z = 3;
// renderer

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);



function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.render(scene, camera);// to start renderer


animate();