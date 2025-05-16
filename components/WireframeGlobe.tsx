import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const WireframeGlobe = () => {
  const globeRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.enableDamping = false;
      // Set initial position with tilt
      globeRef.current.pointOfView({
        lat: -30,
        lng: 40,
        altitude: 2.5 // Distance from globe
      });
    }
  }, []);

  if (!isMounted) {
    return <div className="w-[1000px] h-[1000px]" />; // Empty placeholder with same dimensions
  }

  return (
    <Globe
      ref={globeRef}
      width={1000}
      height={1000}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={
        new THREE.MeshPhongMaterial({
          wireframe: true,
          color: 'hsl(var(--primary))',
          transparent: true,
          opacity: 10, // Increased from 0.3
          wireframeLinewidth: 2, // Increased line width
        })
      }
      atmosphereAltitude={0.15}
      atmosphereColor="hsl(var(--primary))"
      showGlobe={true}
      showAtmosphere={true}
    />
  );
};

export default WireframeGlobe;
