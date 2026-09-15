import * as THREE from './three.module.js';
const host=document.querySelector('#scene'),button=document.querySelector('#motion-toggle');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduce.matches,visible=true,frame=0;
let renderer;
try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch(e){button.hidden=true;throw e}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0xffffff,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(4.8,3.3,6.6);camera.lookAt(0,.1,0);
scene.add(new THREE.AmbientLight(0xffffff,2.1));const key=new THREE.DirectionalLight(0xffffff,3.8);key.position.set(5,7,5);scene.add(key);const fill=new THREE.DirectionalLight(0xffffff,1);fill.position.set(-3,2,-3);scene.add(fill);
const group=new THREE.Group();scene.add(group);
const gold=new THREE.MeshStandardMaterial({color:0xd6b36a,roughness:.72,metalness:.04});const blue=new THREE.MeshStandardMaterial({color:0x011689,roughness:.52});
const box=new THREE.Mesh(new THREE.BoxGeometry(2.3,2.25,2.3),gold);group.add(box);
const edges=new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry),new THREE.LineBasicMaterial({color:0xcc9f52,transparent:true,opacity:.5}));group.add(edges);
const tape=new THREE.Mesh(new THREE.BoxGeometry(.36,.014,2.315),blue);tape.position.y=1.135;group.add(tape);
const frontTape=new THREE.Mesh(new THREE.PlaneGeometry(.36,.45),blue);frontTape.position.set(0,.9,1.156);group.add(frontTape);
const backTape=frontTape.clone();backTape.position.z=-1.156;backTape.rotation.y=Math.PI;group.add(backTape);
const label=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.67),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9}));label.position.set(0,-.06,1.158);group.add(label);
const loader=new THREE.TextureLoader();loader.load('/assets/logo.png',texture=>{texture.colorSpace=THREE.SRGBColorSpace;const logo=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.298),new THREE.MeshBasicMaterial({map:texture,transparent:true}));logo.position.set(0,-.06,1.163);group.add(logo);render()});
const sideLabel=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.8),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9}));sideLabel.rotation.y=Math.PI/2;sideLabel.position.set(1.157,-.15,0);group.add(sideLabel);
for(let i=0;i<23;i++){const bar=new THREE.Mesh(new THREE.PlaneGeometry(i%3===0?.024:.01,.21),new THREE.MeshBasicMaterial({color:0x011689}));bar.rotation.y=Math.PI/2;bar.position.set(1.162,-.15,-.52+i*.045);group.add(bar)}
const seam=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.15,1.132,0),new THREE.Vector3(1.15,1.132,0)]),new THREE.LineBasicMaterial({color:0xcc9f52}));group.add(seam);
group.rotation.y=-.12;group.rotation.z=-.09;
// Decorative transport illustration. No tracking data is represented by this scene.
const disc=new THREE.Mesh(new THREE.CircleGeometry(2,80),new THREE.MeshBasicMaterial({color:0x011689,transparent:true,opacity:.035,side:THREE.DoubleSide}));disc.rotation.x=-Math.PI/2;disc.position.y=-1.7;scene.add(disc);
const pointer={x:0,y:0};host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5});host.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0});
function render(){renderer.render(scene,camera)}
function resize(){const r=host.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();render()}
new ResizeObserver(resize).observe(host);resize();host.classList.add('scene-ready');
function loop(time){frame=0;if(paused||!visible||document.hidden)return;group.position.y=Math.sin(time*.0008)*.105;group.rotation.y=-.12+Math.sin(time*.0003)*.15+pointer.x*.22;group.rotation.x=pointer.y*.07;render();frame=requestAnimationFrame(loop)}
function start(){if(!frame&&!paused&&visible&&!document.hidden)frame=requestAnimationFrame(loop)}
function stop(){cancelAnimationFrame(frame);frame=0}
function update(){button.textContent=paused?'Activar animación':'Pausar animación';button.setAttribute('aria-pressed',String(paused));if(paused){stop();render()}else start()}
button.addEventListener('click',()=>{paused=!paused;update()});reduce.addEventListener('change',()=>{paused=reduce.matches;update()});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:.05}).observe(host);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});update();
window.addEventListener('pagehide',()=>{stop();scene.traverse(o=>{o.geometry?.dispose();if(o.material){const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{m.map?.dispose();m.dispose()})}});renderer.dispose()},{once:true});
