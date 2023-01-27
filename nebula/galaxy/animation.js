import Scene from './loader/LoaderScene.js';
import Loader from './loader/LoaderObject.js';
import BackgroundLines from './objects/BackgroundLines.js';
import Galaxy from './objects/Galaxy.js';

let camera, scene, galaxy, cameraShakeY = 0, speedLines;

if ($('body').hasClass('is-act-home')) {

    scene = new Scene('canvas.background-animation');
    let scene3D = scene.scene;
    camera = scene.camera;

    camera.position.x = 0

    if (window.innerWidth < 768) {
        camera.rotateX(Math.PI / -12);
    } else if (window.innerWidth > 1200) {
        camera.rotateY(Math.PI / -8);
    } else {
        camera.rotateY(Math.PI / 8);
    }

    let $introCmsSection = $('.cms-sections').find('.cms-section.is-intro-section')[0];

    galaxy = new Galaxy();
    scene3D.add(galaxy.group);
    galaxy.group.scale.set(0, 0, 0);
    galaxy.group.rotation.x = 20 * Math.PI / 180;
    galaxy.group.rotation.z = Math.PI / -12;
    galaxy.group.rotation.y = 0;

    speedLines = new BackgroundLines({ count: 100 });
    scene3D.add(speedLines.group);


    var loadingTime = 5;
    let intro = new Loader(loadingTime, sceneEntry);
    intro.load();
    

    document.addEventListener('scroll', sceneChange, { passive : true });
    sceneAnimate();

    function sceneEntry() {
        if (speedLines && galaxy && !(window.scrollY > (window.innerHeight / 2))) {
            speedLines.intro();
            galaxy.in(4);
        }
    }

    function sceneChange() {
        let inView = galaxyInView();

        if (galaxy.init == true) {
            if (!inView && galaxy.status == 'in') {
                speedLines.in(1);
                galaxy.out();
                
            } else if (inView && (galaxy.status == 'out' || galaxy.status == 'init')) {
                speedLines[galaxy.status == 'out' ? 'in' : 'intro'](2);
                galaxy.in(2);
                sceneAnimate();
            }
        }
    };

    function galaxyInView() {
        let $introBounds = $introCmsSection.getBoundingClientRect();
        let $introMiddle = $introBounds.top + ($introBounds.height / 2);
        
        return $introMiddle < 0 ? false : true;
    };

    function sceneAnimate() {
        if (!(galaxy.status == 'out')) {
            window.requestAnimationFrame(sceneAnimate);

            if ( galaxy && galaxy.init == true ) {
                galaxy.update()
                galaxy.group.position.x += Math.cos(cameraShakeY) / 150;
                galaxy.group.position.y += Math.cos(cameraShakeY) / 150;
                cameraShakeY += 0.02;
         
                // Render
                scene.renderer.render(scene.scene, scene.camera);
            }
        }
    }
}