
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
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);
    sceneRef.current = scene;

    // Add fog for depth effect
    scene.fog = new THREE.Fog(0x0a0a0c, 15, 50);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Setup renderer with enhanced quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    // Key light (sun-like)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(5, 15, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);

    // Fill light (softer blue tint)
    const fillLight = new THREE.DirectionalLight(0x8eaaff, 0.5);
    fillLight.position.set(-5, 5, 8);
    scene.add(fillLight);

    // Rim light (for edge definition)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 0, -10);
    scene.add(rimLight);

    // Add spot lights for dramatic effect
    const spotLight = new THREE.SpotLight(0xffa95c, 0.8, 30, Math.PI / 6, 0.5);
    spotLight.position.set(-5, 10, 2);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Add drill rig components
    createDetailedDrillRig();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate the entire rig slightly
      if (modelsRef.current.drillRig) {
        modelsRef.current.drillRig.rotation.y += 0.002;
      }
      
      // Animate the pumpJack if it exists
      if (modelsRef.current.pumpJack) {
        modelsRef.current.pumpJack.rotation.z = Math.sin(Date.now() * 0.001) * 0.2;
      }
      
      // Animate the drill pipe rotation
      if (modelsRef.current.drillPipe) {
        modelsRef.current.drillPipe.rotation.y += 0.01;
      }
      
      // Simulate mud pump pulsing
      if (modelsRef.current.mudPump) {
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.03;
        modelsRef.current.mudPump.scale.set(1, scale, 1);
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
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

  // Update model colors and features based on data
  useEffect(() => {
    if (!modelsRef.current) return;

    // Update top drive color based on motor status
    if (modelsRef.current.topDrive) {
      const material = (modelsRef.current.topDrive.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        material.color.set(data.motorStatus ? 0x44ff44 : 0xff4444);
        // Add glow effect to active components
        material.emissive.set(data.motorStatus ? 0x113311 : 0x331111);
      }
    }

    // Update mud pump color based on hydraulic pressure
    if (modelsRef.current.mudPump) {
      const material = (modelsRef.current.mudPump.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        // Pressure is too high (red) or normal (green)
        const isNormal = data.hydraulicPressure <= 3000;
        material.color.set(isNormal ? 0x44ff44 : 0xff4444);
        material.emissive.set(isNormal ? 0x113311 : 0x331111);
      }
    }

    // Update derrick color based on vibration level
    if (modelsRef.current.derrick) {
      const material = (modelsRef.current.derrick.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        // High vibration (red) or normal (green)
        const isNormal = data.vibrationLevel <= 5.0;
        material.color.set(isNormal ? 0x44ff44 : 0xff4444);
        material.emissive.set(isNormal ? 0x113311 : 0x331111);
      }
    }
    
    // Update bearing temperature visualization
    if (modelsRef.current.bearings) {
      const material = (modelsRef.current.bearings.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        const isNormal = data.mainBearingTemp <= 80;
        material.color.set(isNormal ? 0x44ff44 : 0xff4444);
        // Increase emissive glow with temperature
        const normalizedTemp = Math.min(1, (data.mainBearingTemp - 50) / 50);
        material.emissive.setRGB(normalizedTemp * 0.5, isNormal ? normalizedTemp * 0.3 : 0, 0);
      }
    }
    
  }, [data]);

  // Create the highly detailed drill rig components
  const createDetailedDrillRig = () => {
    if (!sceneRef.current) return;
    
    // Create a group for the entire rig
    const drillRig = new THREE.Group();
    modelsRef.current.drillRig = drillRig;
    sceneRef.current.add(drillRig);

    // Ground/base with more realistic texture
    const groundGeometry = new THREE.BoxGeometry(25, 0.5, 25);
    const groundTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/floors/FloorsCheckerboard_S.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(5, 5);
    
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      map: groundTexture,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.receiveShadow = true;
    ground.position.y = -0.25;
    drillRig.add(ground);

    // Platform
    const platformGeometry = new THREE.BoxGeometry(12, 0.3, 12);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888,
      roughness: 0.7,
      metalness: 0.3
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 0.15;
    platform.receiveShadow = true;
    drillRig.add(platform);

    // Add a drilling pad texture
    const padGeometry = new THREE.CircleGeometry(5, 32);
    const padMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.8
    });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.rotation.x = -Math.PI / 2;
    pad.position.y = 0.16;
    drillRig.add(pad);

    // Create derrick (井架) with more detail
    const derrick = createDetailedDerrick();
    modelsRef.current.derrick = derrick;
    drillRig.add(derrick);

    // Create top drive system (顶驱) with more detail
    const topDrive = createDetailedTopDrive();
    modelsRef.current.topDrive = topDrive;
    drillRig.add(topDrive);

    // Create drawworks (绞车) with more detail
    const drawworks = createDetailedDrawworks();
    modelsRef.current.drawworks = drawworks;
    drillRig.add(drawworks);

    // Create mud pump system (泥浆泵) with more detail
    const mudPump = createDetailedMudPump();
    modelsRef.current.mudPump = mudPump;
    drillRig.add(mudPump);

    // Create BOP stack (防喷器) with more detail
    const bop = createDetailedBOP();
    modelsRef.current.bop = bop;
    drillRig.add(bop);

    // Create shale shaker (振动筛) with more detail
    const shaleShaker = createDetailedShaleShaker();
    modelsRef.current.shaleShaker = shaleShaker;
    drillRig.add(shaleShaker);
    
    // Add mud circulation system
    const mudSystem = createMudCirculationSystem();
    drillRig.add(mudSystem);
    
    // Add bearings module (for temperature monitoring)
    const bearings = createBearingsModule();
    modelsRef.current.bearings = bearings;
    drillRig.add(bearings);

    // Position entire rig
    drillRig.position.y = -4;
    drillRig.rotation.y = Math.PI / 6;
  };
  
  // Create a detailed derrick structure with lattice framework
  const createDetailedDerrick = () => {
    const derrick = new THREE.Group();
    
    // Main derrick structure - use a more complex geometry for realism
    const mainDerrickGeometry = new THREE.BoxGeometry(4, 15, 4);
    const mainDerrickMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4466cc,
      roughness: 0.7,
      metalness: 0.4
    });
    const mainDerrickMesh = new THREE.Mesh(mainDerrickGeometry, mainDerrickMaterial);
    mainDerrickMesh.position.y = 7.5;
    mainDerrickMesh.castShadow = true;
    derrick.add(mainDerrickMesh);

    // Add lattice framework for more realism
    const createLattice = () => {
      const latticeMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.8,
        metalness: 0.6
      });
      
      // Create beams for each side of the derrick
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI / 2);
        for (let j = 0; j < 8; j++) {
          const beam = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.2, 5),
            latticeMaterial
          );
          beam.position.y = 3 + j * 1.5;
          beam.position.x = Math.cos(angle) * 2;
          beam.position.z = Math.sin(angle) * 2;
          beam.rotation.y = angle + Math.PI/2;
          beam.castShadow = true;
          derrick.add(beam);
        }
      }
    };
    
    createLattice();
    
    // Add a crown block at the top
    const crownBlockGeometry = new THREE.BoxGeometry(3.5, 1, 3.5);
    const crownBlockMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.6,
      metalness: 0.7
    });
    const crownBlock = new THREE.Mesh(crownBlockGeometry, crownBlockMaterial);
    crownBlock.position.y = 15;
    crownBlock.castShadow = true;
    derrick.add(crownBlock);
    
    // Add pulley system
    const pulleyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
    const pulleyMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4,
      metalness: 0.8
    });
    
    // Add multiple pulleys to the crown block
    for (let i = -1; i <= 1; i++) {
      const pulley = new THREE.Mesh(pulleyGeometry, pulleyMaterial);
      pulley.position.set(i, 14.5, 0);
      pulley.rotation.x = Math.PI / 2;
      pulley.castShadow = true;
      derrick.add(pulley);
    }
    
    return derrick;
  };
  
  // Create a detailed top drive system
  const createDetailedTopDrive = () => {
    const topDrive = new THREE.Group();
    
    // Main top drive body
    const topDriveGeometry = new THREE.CylinderGeometry(1, 1.2, 3, 16);
    const topDriveMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x44ff44,
      roughness: 0.6,
      metalness: 0.8,
      emissive: 0x113311
    });
    const topDriveMesh = new THREE.Mesh(topDriveGeometry, topDriveMaterial);
    topDriveMesh.position.set(0, 12, 0);
    topDriveMesh.castShadow = true;
    topDrive.add(topDriveMesh);
    
    // Add motor housing
    const motorHousingGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const motorHousingMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
      metalness: 0.3
    });
    const motorHousing = new THREE.Mesh(motorHousingGeometry, motorHousingMaterial);
    motorHousing.position.set(0, 13, 0);
    motorHousing.castShadow = true;
    topDrive.add(motorHousing);
    
    // Add cooling fins
    const finGeometry = new THREE.BoxGeometry(2.2, 0.1, 0.3);
    const finMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.4,
      metalness: 0.6
    });
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3);
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.y = 13;
      fin.position.x = Math.sin(angle) * 1.2;
      fin.position.z = Math.cos(angle) * 1.2;
      fin.rotation.y = angle;
      fin.castShadow = true;
      topDrive.add(fin);
    }
    
    return topDrive;
  };
  
  // Create detailed drawworks
  const createDetailedDrawworks = () => {
    const drawworks = new THREE.Group();
    
    // Main drawworks body
    const drawworksGeometry = new THREE.BoxGeometry(3.5, 2.5, 2.5);
    const drawworksMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcc8844,
      roughness: 0.7,
      metalness: 0.4
    });
    const drawworksMesh = new THREE.Mesh(drawworksGeometry, drawworksMaterial);
    drawworksMesh.position.set(-5, 1.25, 0);
    drawworksMesh.castShadow = true;
    drawworks.add(drawworksMesh);
    
    // Add drum
    const drumGeometry = new THREE.CylinderGeometry(1, 1, 2.2, 16);
    const drumMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.5,
      metalness: 0.7
    });
    const drum = new THREE.Mesh(drumGeometry, drumMaterial);
    drum.position.set(-5, 1.5, 0);
    drum.rotation.x = Math.PI/2;
    drum.castShadow = true;
    drawworks.add(drum);
    
    // Add control panel
    const panelGeometry = new THREE.BoxGeometry(1, 1, 1.5);
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.9,
      metalness: 0.2
    });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(-3, 0.5, -1);
    panel.castShadow = true;
    drawworks.add(panel);
    
    return drawworks;
  };
  
  // Create detailed mud pump system
  const createDetailedMudPump = () => {
    const mudPump = new THREE.Group();
    
    // Main mud pump body
    const pumpBodyGeometry = new THREE.BoxGeometry(2.5, 2, 2.5);
    const pumpBodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x44ff44,
      roughness: 0.6,
      metalness: 0.5,
      emissive: 0x113311
    });
    const pumpBody = new THREE.Mesh(pumpBodyGeometry, pumpBodyMaterial);
    pumpBody.position.set(5, 1, 4);
    pumpBody.castShadow = true;
    mudPump.add(pumpBody);
    
    // Add piston housing
    const pistonHousingGeometry = new THREE.CylinderGeometry(0.8, 0.8, 3, 16);
    const pistonHousingMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.5,
      metalness: 0.7
    });
    const pistonHousing = new THREE.Mesh(pistonHousingGeometry, pistonHousingMaterial);
    pistonHousing.position.set(5, 1, 2);
    pistonHousing.rotation.x = Math.PI/2;
    pistonHousing.castShadow = true;
    mudPump.add(pistonHousing);
    
    // Add fluid end
    const fluidEndGeometry = new THREE.BoxGeometry(2, 1.8, 1.5);
    const fluidEndMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.7,
      metalness: 0.6
    });
    const fluidEnd = new THREE.Mesh(fluidEndGeometry, fluidEndMaterial);
    fluidEnd.position.set(5, 1, 6);
    fluidEnd.castShadow = true;
    mudPump.add(fluidEnd);
    
    return mudPump;
  };
  
  // Create detailed BOP stack
  const createDetailedBOP = () => {
    const bop = new THREE.Group();
    
    // Main BOP body
    const bopBodyGeometry = new THREE.CylinderGeometry(1.2, 1.5, 1.8, 24);
    const bopBodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff4444,
      roughness: 0.5,
      metalness: 0.7,
      emissive: 0x331111
    });
    const bopBody = new THREE.Mesh(bopBodyGeometry, bopBodyMaterial);
    bopBody.position.set(0, 0.9, 0);
    bopBody.castShadow = true;
    bop.add(bopBody);
    
    // Add rams
    const ramGeometry = new THREE.BoxGeometry(0.8, 0.4, 3);
    const ramMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.6,
      metalness: 0.8
    });
    
    const ram1 = new THREE.Mesh(ramGeometry, ramMaterial);
    ram1.position.set(0, 0.7, 0);
    ram1.castShadow = true;
    bop.add(ram1);
    
    const ram2 = new THREE.Mesh(ramGeometry, ramMaterial);
    ram2.position.set(0, 1.2, 0);
    ram2.rotation.z = Math.PI/2;
    ram2.castShadow = true;
    bop.add(ram2);
    
    // Add wellhead connection
    const wellheadGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 16);
    const wellheadMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.5,
      metalness: 0.7
    });
    const wellhead = new THREE.Mesh(wellheadGeometry, wellheadMaterial);
    wellhead.position.set(0, 0.25, 0);
    wellhead.castShadow = true;
    bop.add(wellhead);
    
    // Add accumulator
    const accumulatorGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16);
    const accumulatorMaterial = new THREE.MeshStandardMaterial({
      color: 0x5555aa,
      roughness: 0.5,
      metalness: 0.7
    });
    const accumulator = new THREE.Mesh(accumulatorGeometry, accumulatorMaterial);
    accumulator.position.set(2, 0.75, 0);
    accumulator.rotation.z = Math.PI/2;
    accumulator.castShadow = true;
    bop.add(accumulator);
    
    return bop;
  };
  
  // Create detailed shale shaker
  const createDetailedShaleShaker = () => {
    const shaleShaker = new THREE.Group();
    
    // Main shaker body
    const shakerBodyGeometry = new THREE.BoxGeometry(3.5, 0.8, 2);
    const shakerBodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xaaaa44,
      roughness: 0.7,
      metalness: 0.3
    });
    const shakerBody = new THREE.Mesh(shakerBodyGeometry, shakerBodyMaterial);
    shakerBody.position.set(5, 0.4, -3);
    shakerBody.castShadow = true;
    shaleShaker.add(shakerBody);
    
    // Add screen mesh
    const screenGeometry = new THREE.PlaneGeometry(3, 1.8);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: true
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(5, 0.85, -3);
    screen.rotation.x = -Math.PI/2;
    shaleShaker.add(screen);
    
    // Add motor
    const motorGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    const motorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.7
    });
    const motor = new THREE.Mesh(motorGeometry, motorMaterial);
    motor.position.set(6.5, 0.3, -3);
    motor.rotation.z = Math.PI/2;
    motor.castShadow = true;
    shaleShaker.add(motor);
    
    // Add collection basin
    const basinGeometry = new THREE.BoxGeometry(3, 0.5, 2.2);
    const basinMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.5,
      metalness: 0.3
    });
    const basin = new THREE.Mesh(basinGeometry, basinMaterial);
    basin.position.set(5, 0, -3);
    basin.castShadow = true;
    shaleShaker.add(basin);
    
    return shaleShaker;
  };
  
  // Create mud circulation system (pipes connecting components)
  const createMudCirculationSystem = () => {
    const mudSystem = new THREE.Group();
    
    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.6,
      metalness: 0.4
    });
    
    // Create pipes connecting mud pump to top drive
    const createPipe = (startX, startY, startZ, endX, endY, endZ) => {
      const direction = new THREE.Vector3(endX - startX, endY - startY, endZ - startZ);
      const length = direction.length();
      direction.normalize();
      
      const pipeGeometry = new THREE.CylinderGeometry(0.15, 0.15, length, 8);
      const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      
      // Position at midpoint
      pipe.position.set(
        (startX + endX) / 2,
        (startY + endY) / 2,
        (startZ + endZ) / 2
      );
      
      // Orient the cylinder
      pipe.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction
      );
      
      pipe.castShadow = true;
      return pipe;
    };
    
    // Add main mud supply line
    mudSystem.add(createPipe(5, 1, 4, 0, 8, 0));
    
    // Add return line from wellhead to shale shaker
    mudSystem.add(createPipe(0, 1, 0, 5, 1, -3));
    
    // Add pipe from shale shaker back to mud pump (mud pit connection)
    mudSystem.add(createPipe(5, 0.5, -3, 5, 0.5, 3));
    
    // Add elbows (curved connectors)
    const createElbow = (x, y, z, radius, startAngle, endAngle) => {
      const curve = new THREE.EllipseCurve(
        0, 0,             // center
        radius, radius,   // xRadius, yRadius
        startAngle, endAngle,  // startAngle, endAngle
        false,            // clockwise
        0                 // rotation
      );
      
      const points = curve.getPoints(12);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const elbowMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.6,
        metalness: 0.4
      });
      
      // Convert curve to 3D pipe segments
      for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];
        
        const segment = createPipe(
          x + start.x, y, z + start.y,
          x + end.x, y, z + end.y
        );
        
        mudSystem.add(segment);
      }
    };
    
    // Add elbows at key connection points
    createElbow(0, 1, 0, 0.8, 0, Math.PI/2);
    createElbow(5, 1, -3, 0.8, Math.PI, Math.PI*3/2);
    
    return mudSystem;
  };
  
  // Create bearings module for temperature monitoring
  const createBearingsModule = () => {
    const bearingsModule = new THREE.Group();
    
    // Main bearing housing
    const housingGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1, 16);
    const housingMaterial = new THREE.MeshStandardMaterial({
      color: 0x44ff44,  // Will change based on temp
      roughness: 0.5,
      metalness: 0.7,
      emissive: 0x113311
    });
    const housing = new THREE.Mesh(housingGeometry, housingMaterial);
    housing.position.set(-3, 12, 0);
    housing.castShadow = true;
    bearingsModule.add(housing);
    
    // Add cooling fins
    const finGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.2);
    const finMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.4,
      metalness: 0.6
    });
    
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4);
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.y = 12;
      fin.position.x = -3 + Math.sin(angle) * 0.9;
      fin.position.z = Math.cos(angle) * 0.9;
      fin.rotation.y = angle;
      fin.castShadow = true;
      bearingsModule.add(fin);
    }
    
    // Add sensor attachment
    const sensorGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.2);
    const sensorMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.5,
      metalness: 0.7
    });
    const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
    sensor.position.set(-3.8, 12, 0);
    sensor.castShadow = true;
    bearingsModule.add(sensor);
    
    return bearingsModule;
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden"></div>
      <div className="absolute top-2 left-2 bg-black/70 p-2 rounded-md text-xs">
        <p className="text-white">旋转查看 3D 模型</p>
      </div>
      <div className="absolute bottom-2 right-2 grid grid-cols-2 gap-2 bg-black/70 p-2 rounded-md text-xs">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.motorStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-white">顶驱</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.hydraulicPressure > 3000 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <span className="text-white">泥浆泵</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.vibrationLevel > 5.0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <span className="text-white">井架</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-1 ${data.mainBearingTemp > 80 ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <span className="text-white">轴承温度</span>
        </div>
      </div>
    </div>
  );
};

export default DrillModel3D;
