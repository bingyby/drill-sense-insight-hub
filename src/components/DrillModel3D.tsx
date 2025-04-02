
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface DrillModelProps {
  data: {
    motorStatus: boolean;
    hydraulicPressure: number;
    mainBearingTemp: number;
    vibrationLevel: number;
  };
}

const DrillModel3D = ({ data }: DrillModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelsRef = useRef<{ [key: string]: THREE.Group }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 5, 5);
    scene.add(directionalLight);

    // Add drill rig components
    createDrillRig();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate the entire rig slightly
      if (modelsRef.current.drillRig) {
        modelsRef.current.drillRig.rotation.y += 0.002;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, []);

  // Update model colors based on data
  useEffect(() => {
    if (!modelsRef.current) return;

    // Update top drive color based on motor status
    if (modelsRef.current.topDrive) {
      const material = (modelsRef.current.topDrive.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        material.color.set(data.motorStatus ? 0x44ff44 : 0xff4444);
      }
    }

    // Update mud pump color based on hydraulic pressure
    if (modelsRef.current.mudPump) {
      const material = (modelsRef.current.mudPump.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        // Pressure is too high (red) or normal (green)
        material.color.set(data.hydraulicPressure > 3000 ? 0xff4444 : 0x44ff44);
      }
    }

    // Update derrick color based on vibration level
    if (modelsRef.current.derrick) {
      const material = (modelsRef.current.derrick.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        // High vibration (red) or normal (green)
        material.color.set(data.vibrationLevel > 5.0 ? 0xff4444 : 0x44ff44);
      }
    }
    
  }, [data]);

  // Create the drill rig components
  const createDrillRig = () => {
    if (!sceneRef.current) return;
    
    // Create a group for the entire rig
    const drillRig = new THREE.Group();
    modelsRef.current.drillRig = drillRig;
    sceneRef.current.add(drillRig);

    // Ground/base
    const groundGeometry = new THREE.BoxGeometry(15, 0.5, 15);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.25;
    drillRig.add(ground);

    // Derrick (井架)
    const derrick = new THREE.Group();
    modelsRef.current.derrick = derrick;
    drillRig.add(derrick);
    
    // Derrick structure
    const derrickGeometry = new THREE.BoxGeometry(4, 12, 4);
    const derrickMaterial = new THREE.MeshStandardMaterial({ color: 0x4466cc });
    const derrickMesh = new THREE.Mesh(derrickGeometry, derrickMaterial);
    derrickMesh.position.y = 6;
    derrick.add(derrickMesh);

    // Top Drive (顶驱)
    const topDrive = new THREE.Group();
    modelsRef.current.topDrive = topDrive;
    drillRig.add(topDrive);
    
    const topDriveGeometry = new THREE.CylinderGeometry(1, 1, 2, 16);
    const topDriveMaterial = new THREE.MeshStandardMaterial({ color: 0x44ff44 });
    const topDriveMesh = new THREE.Mesh(topDriveGeometry, topDriveMaterial);
    topDriveMesh.position.set(0, 10, 0);
    topDrive.add(topDriveMesh);
    
    // Drill pipe
    const drillPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 16);
    const drillPipeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const drillPipe = new THREE.Mesh(drillPipeGeometry, drillPipeMaterial);
    drillPipe.position.set(0, 5, 0);
    topDrive.add(drillPipe);

    // Drawworks (绞车)
    const drawworks = new THREE.Group();
    modelsRef.current.drawworks = drawworks;
    drillRig.add(drawworks);
    
    const drawworksGeometry = new THREE.BoxGeometry(3, 2, 2);
    const drawworksMaterial = new THREE.MeshStandardMaterial({ color: 0xcc8844 });
    const drawworksMesh = new THREE.Mesh(drawworksGeometry, drawworksMaterial);
    drawworksMesh.position.set(-4, 1, 0);
    drawworks.add(drawworksMesh);

    // Mud Pump (泥浆泵)
    const mudPump = new THREE.Group();
    modelsRef.current.mudPump = mudPump;
    drillRig.add(mudPump);
    
    const mudPumpGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const mudPumpMaterial = new THREE.MeshStandardMaterial({ color: 0x44ff44 });
    const mudPumpMesh = new THREE.Mesh(mudPumpGeometry, mudPumpMaterial);
    mudPumpMesh.position.set(4, 0.75, 2);
    mudPump.add(mudPumpMesh);

    // BOP (防喷器)
    const bop = new THREE.Group();
    modelsRef.current.bop = bop;
    drillRig.add(bop);
    
    const bopGeometry = new THREE.CylinderGeometry(1, 1, 1, 16);
    const bopMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });
    const bopMesh = new THREE.Mesh(bopGeometry, bopMaterial);
    bopMesh.position.set(0, 0.5, 0);
    bop.add(bopMesh);

    // Shale Shaker (振动筛)
    const shaleShaker = new THREE.Group();
    modelsRef.current.shaleShaker = shaleShaker;
    drillRig.add(shaleShaker);
    
    const shaleShakeGeometry = new THREE.BoxGeometry(2.5, 0.5, 1.5);
    const shaleShakeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaa44 });
    const shaleShakeMesh = new THREE.Mesh(shaleShakeGeometry, shaleShakeMaterial);
    shaleShakeMesh.position.set(4, 0.25, -2);
    shaleShaker.add(shaleShakeMesh);

    // Position entire rig
    drillRig.position.y = -2;
    drillRig.rotation.y = Math.PI / 6;
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden"></div>
      <div className="absolute top-2 left-2 bg-black/70 p-2 rounded-md text-xs">
        <p className="text-white">旋转查看 3D 模型 (Rotate to view 3D model)</p>
      </div>
      <div className="absolute bottom-2 right-2 grid grid-cols-2 gap-2 bg-black/70 p-2 rounded-md text-xs">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.motorStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-white">顶驱 (Top Drive)</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.hydraulicPressure > 3000 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <span className="text-white">泥浆泵 (Mud Pump)</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.vibrationLevel > 5.0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <span className="text-white">井架 (Derrick)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-1 bg-yellow-500"></div>
          <span className="text-white">振动筛 (Shale Shaker)</span>
        </div>
      </div>
    </div>
  );
};

export default DrillModel3D;
