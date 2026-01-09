/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Center, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Types for JSX ---
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      torusGeometry: any;
      ambientLight: any;
      pointLight: any;
      icosahedronGeometry: any;
      lineSegments: any;
      lineBasicMaterial: any;
      bufferGeometry: any;
      bufferAttribute: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      torusGeometry: any;
      ambientLight: any;
      pointLight: any;
      icosahedronGeometry: any;
      lineSegments: any;
      lineBasicMaterial: any;
      bufferGeometry: any;
      bufferAttribute: any;
    }
  }
}

// --- Floating Symbols (Tools) ---
const FloatingSymbol = ({ char, position, color = "#C5A059", rotation = [0, 0, 0] }: { char: string, position: [number, number, number], color?: string, rotation?: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
      ref.current.rotation.y = t * 0.2 + rotation[1];
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation as [number, number, number]}>
        <Center>
            <Text
                font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
                fontSize={1}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#1a1a1a"
            >
                {char}
            </Text>
        </Center>
    </group>
  );
};

// --- Abstract Atom Shape ---
const AtomShape = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <group position={position} scale={scale} ref={ref}>
            <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh rotation={[Math.PI/3, 0, 0]}>
                <torusGeometry args={[1.2, 0.02, 16, 64]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh rotation={[-Math.PI/3, 0, 0]}>
                <torusGeometry args={[1.2, 0.02, 16, 64]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh rotation={[0, Math.PI/2, 0]}>
                <torusGeometry args={[1.2, 0.02, 16, 64]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    )
}

interface PlanetProps {
    count?: number;
    colorMode?: 'dark' | 'light' | 'mixed';
    opacity?: number;
    area?: number;
}

// --- Background Planets/Bubbles (Reusable) ---
const BackgroundPlanets = ({ count = 20, colorMode = 'mixed', opacity = 0.8, area = 15 }: PlanetProps) => {
  const planets = useMemo(() => {
    return new Array(count).fill(0).map(() => {
        let color;
        if (colorMode === 'dark') color = Math.random() > 0.5 ? "#44403c" : "#1c1917";
        else if (colorMode === 'light') color = Math.random() > 0.5 ? "#C5A059" : "#d6d3d1";
        else color = Math.random() > 0.6 ? "#b45309" : "#44403c";

        return {
            position: [
                (Math.random() - 0.5) * area,
                (Math.random() - 0.5) * area * 0.8,
                (Math.random() - 0.5) * 8 - 4
            ] as [number, number, number],
            scale: 0.2 + Math.random() * 0.6,
            color: color,
            speed: 0.1 + Math.random() * 0.4
        }
    })
  }, [count, colorMode, area])

  return (
    <group>
      {planets.map((planet, i) => (
         <Float key={i} speed={planet.speed} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
            <mesh position={planet.position} scale={planet.scale}>
               <sphereGeometry args={[1, 32, 32]} />
               <meshStandardMaterial 
                  color={planet.color} 
                  transparent 
                  opacity={opacity}
                  roughness={0.4} 
                  metalness={0.3}
               />
            </mesh>
         </Float>
      ))}
    </group>
  )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="city" />
        
        <BackgroundPlanets count={25} colorMode="mixed" opacity={0.9} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <FloatingSymbol char="π" position={[-2.5, 1, -1]} color="#1c1917" />
          <FloatingSymbol char="⚡" position={[2.5, 1.5, -2]} color="#b45309" />
          <FloatingSymbol char="🤖" position={[3, -1.5, 0]} color="#1c1917" />
          <AtomShape position={[-2, -1.5, 0]} scale={0.8} />
          <FloatingSymbol char="{ }" position={[0, 2.5, -3]} color="#57534e" />
        </Float>

        <Sparkles count={80} scale={12} size={4} speed={0.4} opacity={0.7} color="#44403c" />
      </Canvas>
    </div>
  );
};

// --- Neural Constellation ---
const ConstellationContent = ({ color = "#C5A059" }: { color?: string }) => {
  const count = 25; // Increased count for density
  
  const { nodes, linesData } = useMemo(() => {
      const nodesArr = new Array(count).fill(0).map(() => ({
          position: [
              (Math.random() - 0.5) * 8, // Wider spread
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4
          ] as [number, number, number]
      }));

      const points: number[] = [];
      nodesArr.forEach((node, i) => {
        nodesArr.forEach((node2, j) => {
            const dist = Math.sqrt(
                Math.pow(node.position[0] - node2.position[0], 2) +
                Math.pow(node.position[1] - node2.position[1], 2) +
                Math.pow(node.position[2] - node2.position[2], 2)
            );
            if (i < j && dist < 3.5) { // Increased connection distance
                points.push(...node.position);
                points.push(...node2.position);
            }
        });
      });

      return { nodes: nodesArr, linesData: new Float32Array(points) };
  }, []);

  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
      if(ref.current) {
          ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      }
  })

  return (
    <group ref={ref}>
        {nodes.map((node, i) => (
            <mesh key={i} position={node.position}>
                <icosahedronGeometry args={[0.06, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </mesh>
        ))}
        
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={linesData.length / 3}
                    array={linesData}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color={color} opacity={0.2} transparent linewidth={1} />
        </lineSegments>
    </group>
  );
}

// A cluster that looks like a neural network or a constellation
export const NeuralConstellationScene: React.FC<{ color?: string }> = ({ color = "#C5A059" }) => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <ConstellationContent color={color} />
        
        <Sparkles count={80} scale={15} size={2} speed={0.2} opacity={0.4} color={color} />
      </Canvas>
    </div>
  );
}

// --- Subtle Background for Standard Sections ---
// Now includes floating geometry to be more visible
export const SubtleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Added actual 3D objects for better visibility */}
        <BackgroundPlanets count={12} colorMode="light" opacity={0.5} area={12} />

        <Sparkles 
          count={40} 
          scale={[10, 10, 10]} 
          size={3} 
          speed={0.3} 
          opacity={0.5} 
          color="#C5A059" 
        />
      </Canvas>
    </div>
  );
};
