// import gsap from "@gsap";
import * as THREE from "@three";

export default class Scene {
    constructor(selector) {
        this.canvas = document.querySelector(selector);
        this.init();
    }

    init() {

        // Scene
        this.scene = new THREE.Scene();
        // this.scene.background.setClearColor( 0x000000, 0 )
        
        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
        
            // Update camera
            this.camera.aspect = sizes.width / sizes.height
            this.camera.updateProjectionMatrix()
        
            // Update renderer
            this.renderer.setSize(sizes.width, sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
        
        /**
         * Camera
         */
        // Base camera
        this.camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 1000)
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 60
        
        this.scene.add(this.camera)
        
        /**
         * Renderer
         */
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true 
        })
        
        this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    add(entity) {
        this.scene.add(entity)
    }

    update() {
        this.camera.position.y = .005 * -window.scrollY;
    }
}

