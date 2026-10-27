import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";

const gui = new GUI();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwou7S3Cic9U7Od3cS_84ethiAD6t2LvVJ8PGtN8M8w&s=10",
);

const clothTexture = textureLoader.load(
  "/texture.jpg",
  () => {
    console.log("Texture loaded successfully");
  },
  undefined,
  (error) => {
    console.error("Texture failed to load:", error);
  },
);

const property = {
  color: 0xff0000,
};

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();

let mixer = null;

// let soldier = null;
// gltfLoader.load(
//   "/Soldier.glb",
//   (gltf) => {
//     soldier = gltf.scene;
//     console.log(gltf.animations);
//     if (gltf.animations && gltf.animations.length > 0) {
//       mixer = new THREE.AnimationMixer(soldier);
//       const action = mixer.clipAction(gltf.animations[3]);
//       action.play();
//     }
//     soldier.scale.set(1, 1, 1);
//     soldier.position.set(0, -1, 0);
//     soldier.rotation.y = Math.PI;
//     scene.add(soldier);

//     mixer = new THREE.AnimationMixer(soldier);
//     const animations = {
//       walk: gltf.animations.find((clip) =>
//         clip.name.toLowerCase().includes("walk"),
//       ),
//       run: gltf.animations.find((clip) =>
//         clip.name.toLowerCase().includes("run"),
//       ),
//       tpose: gltf.animations.find(
//         (clip) =>
//           clip.name.toLowerCase().includes("tpose") ||
//           clip.name.toLowerCase().includes("t-pose"),
//       ),
//       idle: gltf.animations.find((clip) =>
//         clip.name.toLowerCase().includes("idle"),
//       ),
//     };

//     console.log(
//       "Available animations:",
//       gltf.animations.map((clip) => clip.name),
//     );
//     console.log("Animation map:", animations);

//     let currentAction = null;
//     function playAnimation(name) {
//       const clip = animations[name];
//       if (!clip) {
//         console.warn(`Animation "${name}" not found.`);
//         return;
//       }
//       const newAction = mixer.clipAction(clip);
//       if (currentAction == newAction) {
//         return;
//       }
//       newAction.reset();
//       newAction.play();
//       newAction.setEffectiveTimeScale(1);
//       newAction.setEffectiveWeight(1);

//       if (currentAction) {
//         currentAction.crossFadeTo(newAction, 0.5, false);
//       }

//       currentAction = newAction;
//       console.log(`Playing animation: ${name}`);
//     }
//     playAnimation("idle");

//     window.addEventListener("keydown", (event) => {
//       switch (event.key.toLowerCase()) {
//         case "w":
//           playAnimation("walk");
//           break;
//         case "r":
//           playAnimation("run");
//           break;
//         case "t":
//           playAnimation("tpose");
//           break;
//         case "i":
//           playAnimation("idle");
//           break;
//         default:
//           console.log(`No animation mapped for key: ${event.key}`);
//       }
//     });

//     console.log("GLTF model loaded successfully");
//   },
//   () => {
//     console.log("GLTF model is loading...");
//   },
//   (error) => {
//     console.error("GLTF model failed to load:", error);
//   },
// );



const cameraRotationSpeed = 0.5; // Adjust this value to control the rotation speed
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        cameraRotationSpeed,
      );
      break;
    case "ArrowRight":
      camera.position.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -cameraRotationSpeed,
      );
      break;
      case "ArrowUp":
      camera.position.applyAxisAngle(
        new THREE.Vector3(1, 0, 0),
        cameraRotationSpeed,
      );
      break;
    case "ArrowDown":
      camera.position.applyAxisAngle(
        new THREE.Vector3(1, 0, 0),
        -cameraRotationSpeed,
      );
      break;
    default:
      break;
  }
});
// const clock = new THREE.Clock();

const timer = new THREE.Clock();

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(1, 1, 1);

// 3D-object - mesh

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
// const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
// scene.add( helper );

// const geometry = new THREE.BufferGeometry();

// const count = 50;

// const positionArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = (Math.random() - 0.5) * 2;
// }
// geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));

// material
const material = new THREE.MeshStandardMaterial({ map: clothTexture });

// mesh
const cube = new THREE.Mesh(geometry, material);
// gui.add(cube.position, "x").min(-3).max(3).step(0.01).name("cubeX");
// gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("cubeY");
// gui.add(cube.position, "z").min(-3).max(3).step(0.01).name("cubeZ");
// scene.add(cube);
scene.add(ambientLight);
scene.add(directionalLight);
// gui.add(cube, "visible");

// gui.add(material, "wireframe");

// gui.addColor(property, "color").onChange(() => {
//   material.color.set(property.color);
// });

const positionFolder = gui.addFolder("position");
const rotationFolder = gui.addFolder("rotation");

positionFolder.add(cube.position, "x").min(-3).max(3).step(0.01).name("cubeX");
positionFolder.add(cube.position, "y").min(-3).max(3).step(0.01).name("cubeY");
positionFolder.add(cube.position, "z").min(-3).max(3).step(0.01).name("cubeZ");

rotationFolder.add(cube.rotation, "x").min(-3).max(3).step(0.01).name("cubeX");
rotationFolder.add(cube.rotation, "y").min(-3).max(3).step(0.01).name("cubeY");
rotationFolder.add(cube.rotation, "z").min(-3).max(3).step(0.01).name("cubeZ");

// camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);

// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100);

camera.position.z = 3;
camera.lookAt(0, 0, 0);
// renderer

const canvas = document.querySelector("#webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);


// Environment Map
const hdrLoader = new HDRLoader();

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

hdrLoader.load(
  "/env_map.hdr",
  (hdrTexture) => {
    const envRenderTarget =
      pmremGenerator.fromEquirectangular(hdrTexture);

    scene.environment = envRenderTarget.texture;
    scene.background = hdrTexture;

    hdrTexture.dispose();
    pmremGenerator.dispose();

    console.log("HDR environment applied successfully!");
    
  },
  undefined,
  (error) => {
    console.error("HDR loading failed:", error);
    pmremGenerator.dispose();
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

window.addEventListener("resize", () => {
  // update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
  // timer.update();
  controls.update();
  const delta = timer.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
renderer.render(scene, camera); // to start renderer

animate();
