import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const WireframeGlobe = () => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      
      globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={600}
      height={600}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={
        new THREE.MeshPhongMaterial({
          wireframe: true,
          color: 'hsl(var(--primary))',
          transparent: true,
          opacity: 0.3,
        })
      }
      atmosphereColor="hsl(var(--primary))"
      atmosphereAltitude={0.15}
      showGlobe={true}
      showAtmosphere={true}
    />
  );
};

export default WireframeGlobe;