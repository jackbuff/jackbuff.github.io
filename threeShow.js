import * as THREE from 'three';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, document.getElementById("threeCol").innerWidth / document.getElementById("threeCol").innerHeight, 0.1, 1000 );
camera.position.set(5,5,10); 
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding; 
document.body.appendChild( renderer.domElement ); 
var mat = new THREE.MeshStandardMaterial();
var controls = new OrbitControls(camera, renderer.domElement);
var ambientLight = new THREE.AmbientLight(0x202020);
var topLight = new THREE.PointLight(0xffffff,1,60);
topLight.position.set(1,5,5)
scene.add(topLight);
var topLight2 = new THREE.PointLight(0xffffff,1,60);
topLight2.position.set(-2,0,-10);
scene.add(topLight2);
var bottomLight = new THREE.PointLight(0xffffff,1,60);
bottomLight.position.set(0,-8,0);
scene.add(bottomLight);
scene.background = new THREE.Color('white');
const loader = new GLTFLoader();
var materialChildren = new THREE.MeshBasicMaterial({color: 'white'});
function loadModel(){
    loader.load('examplePBpouch.json',
    function(gltf){
        gltf.scene.children[0].position.set(-1,-1,-6);
        controls.target = new THREE.Vector3(-1,-1,-6);
        for(var i = 1; i < gltf.scene.children[0].children.length; i++){//i = 1 to skip the zipper, which needs parent's color
            console.log(gltf.scene.children[0].children[i]);
            gltf.scene.children[0].children[i].material = materialChildren; //now setting the child objects of the pouch object
        }
        console.log(gltf.scene.children[0]);
        scene.add(gltf.scene);
    }, undefined, function(error){
        console.log("load error");
    });
}
