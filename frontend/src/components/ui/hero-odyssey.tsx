// src/components/ui/hero-odyssey.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Debounce utility for performance optimization
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// --- Utility Grid Component (Optimized with will-change) ---
const HeroGrid = React.memo(() => (
    <div className="absolute inset-0 pointer-events-none z-0" style={{ willChange: 'transform' }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)" />
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
));

// --- ElasticHueSlider Component (FIXED for visible track and thumb) ---

interface ElasticHueSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
}

export const ElasticHueSlider: React.FC<ElasticHueSliderProps> = React.memo(({
    value,
    onChange,
    min = 0,
    max = 360,
    step = 1,
    label = 'Adjust Lightning Hue',
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Define the necessary handlers with useCallback for optimization
    const handleMouseDown = useCallback(() => setIsDragging(true), []);
    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    const progress = ((value - min) / (max - min));

    // Approximate thumb size offset for centering the visual thumb 
    const THUMB_SIZE = 16;
    
    // Calculate the left position of the thumb in the track
    const thumbLeft = `calc(${progress * 100}% - ${THUMB_SIZE * progress}px + ${THUMB_SIZE/2}px)`;

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    }, [onChange]);

    // Custom styles to hide the native thumb/track (crucial for range input customization)
    const inputStyle = {
        WebkitAppearance: 'none', 
        appearance: 'none',
        backgroundColor: 'transparent',
    } as React.CSSProperties;


    return (
        <div className="relative w-full max-w-[200px] flex flex-col items-start" ref={sliderRef}>
            {label && <label htmlFor="hue-slider-native" className="text-gray-300 text-xs mb-1 font-medium tracking-wider">{label}</label>}
            <div className="relative w-full h-5 flex items-center">
                
                {/* Custom Track (Gradient for hue range) - Z-10 */}
                <div
                    className="absolute left-0 w-full h-1 rounded-full z-10"
                    style={{ 
                        background: 'linear-gradient(to right, hsl(0, 70%, 70%), hsl(60, 70%, 70%), hsl(120, 70%, 70%), hsl(180, 70%, 70%), hsl(240, 70%, 70%), hsl(300, 70%, 70%), hsl(360, 70%, 70%))',
                        boxShadow: `0 0 5px hsl(${value}, 70%, 50%)`
                    }}
                ></div>
                
                {/* Native input: Handles interaction, but visually transparent - Z-30 */}
                <input
                    id="hue-slider-native"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleInputChange}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    className="absolute inset-0 w-full h-full cursor-pointer z-30 opacity-0"
                    style={inputStyle}
                />

                {/* Custom Thumb (Animated) - Z-20 */}
                <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 z-20"
                    style={{ left: thumbLeft, willChange: 'transform' }}
                    animate={{ 
                        scale: isDragging ? 1.4 : 1, 
                        backgroundColor: `hsl(${value}, 80%, 60%)`,
                        x: `-${THUMB_SIZE/2}px` // Adjust X to center the thumb visually
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: isDragging ? 15 : 25 }}
                >
                    <div className={`w-[${THUMB_SIZE}px] h-[${THUMB_SIZE}px] rounded-full bg-white shadow-xl border-2 border-gray-900/50`} />
                </motion.div>
            </div>

            {/* Display current value below */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gray-400 mt-2 ml-1"
                >
                    {value}°
                </motion.div>
            </AnimatePresence>
        </div>
    );
});


// --- Lightning WebGL Component (Unchanged) ---
interface LightningProps {
    hue?: number;
    xOffset?: number;
    speed?: number;
    intensity?: number;
    size?: number;
}

const Lightning: React.FC<LightningProps> = ({
    hue = 230,
    xOffset = 0,
    speed = 1,
    intensity = 1,
    size = 1,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };
        resizeCanvas();
        
        // Debounced resize handler for better performance
        const debouncedResize = debounce(resizeCanvas, 150);
        window.addEventListener("resize", debouncedResize);

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const vertexShaderSource = `
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float uHue;
            uniform float uXOffset;
            uniform float uSpeed;
            uniform float uIntensity;
            uniform float uSize;
            
            #define OCTAVE_COUNT 10

            // Convert HSV to RGB.
            vec3 hsv2rgb(vec3 c) {
                vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
                return c.z * mix(vec3(1.0), rgb, c.y);
            }

            float hash11(float p) {
                p = fract(p * .1031);
                p *= p + 33.33;
                p *= p + p;
                return fract(p);
            }

            float hash12(vec2 p) {
                vec3 p3 = fract(vec3(p.xyx) * .1031);
                p3 += dot(p3, p3.yzx + 33.33);
                return fract((p3.x + p3.y) * p3.z);
            }

            mat2 rotate2d(float theta) {
                float c = cos(theta);
                float s = sin(theta);
                return mat2(c, -s, s, c);
            }

            float noise(vec2 p) {
                vec2 ip = floor(p);
                vec2 fp = fract(p);
                float a = hash12(ip);
                float b = hash12(ip + vec2(1.0, 0.0));
                float c = hash12(ip + vec2(0.0, 1.0));
                float d = hash12(ip + vec2(1.0, 1.0));
                
                vec2 t = smoothstep(0.0, 1.0, fp);
                return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
            }

            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                for (int i = 0; i < OCTAVE_COUNT; ++i) {
                    value += amplitude * noise(p);
                    p *= rotate2d(0.45);
                    p *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }

            void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
                // Normalized pixel coordinates.
                vec2 uv = fragCoord / iResolution.xy;
                uv = 2.0 * uv - 1.0;
                uv.x *= iResolution.x / iResolution.y;
                // Apply horizontal offset.
                uv.x += uXOffset;
                
                // Adjust uv based on size and animate with speed.
                uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
                
                float dist = abs(uv.x);
                // Compute base color using hue.
                vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
                // Compute color with intensity and speed affecting time.
                vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
                col = pow(col, vec3(1.0));
                fragColor = vec4(col, 1.0);
            }

            void main() {
                mainImage(gl_FragColor, gl_FragCoord.xy);
            }
        `;

        const compileShader = (
            source: string,
            type: number
        ): WebGLShader | null => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(
            fragmentShaderSource,
            gl.FRAGMENT_SHADER
        );
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program linking error:", gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        const vertices = new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
        ]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");
        const uHueLocation = gl.getUniformLocation(program, "uHue");
        const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
        const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
        const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
        const uSizeLocation = gl.getUniformLocation(program, "uSize");

        const startTime = performance.now();
        let animationFrameId: number;
        
        const render = () => {
            // Only resize viewport, not canvas dimensions (expensive operation)
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
            const currentTime = performance.now();
            gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
            gl.uniform1f(uHueLocation, hue);
            gl.uniform1f(uXOffsetLocation, xOffset);
            gl.uniform1f(uSpeedLocation, speed);
            gl.uniform1f(uIntensityLocation, intensity);
            gl.uniform1f(uSizeLocation, size);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            cancelAnimationFrame(animationFrameId);
            // Clean up WebGL resources
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(vertexBuffer);
        };
    }, [hue, xOffset, speed, intensity, size]);

    return <canvas ref={canvasRef} className="w-full h-full relative" style={{ willChange: 'transform' }} />;
};


// --- HeroOdysseyBackground Wrapper (The primary background container, now including the grid) ---

export const HeroOdysseyBackground: React.FC<LightningProps & { children: React.ReactNode }> = React.memo(({
    hue = 220,
    xOffset = 0,
    speed = 1.6,
    intensity = 0.6,
    size = 2,
    children,
}) => {
    return (
        <div className="relative w-full bg-black text-white overflow-hidden min-h-screen">
            {/* Main container with space for content - Z-20 for content to be on top */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>

            {/* Background elements - Z-0 */}
            <div className="absolute inset-0 z-0">
                {/* Add the Grid */}
                <HeroGrid />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/80" style={{ willChange: 'opacity' }}></div>

                {/* Glowing circle - GPU accelerated */}
                <div 
                    className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl"
                    style={{ willChange: 'transform, opacity' }}
                ></div>

                {/* Central light beam - Lightning WebGL Component */}
                <div className="absolute top-0 w-[100%] left-1/2 transform -translate-x-1/2 h-full" style={{ willChange: 'transform' }}>
                    <Lightning
                        hue={hue}
                        xOffset={xOffset}
                        speed={speed}
                        intensity={intensity}
                        size={size}
                    />
                </div>

                {/* Planet/sphere - Optimized backdrop-blur */}
                <div 
                    className="z-10 absolute top-[55%] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#1e386b_15%,_#000000de_70%,_#000000ed_100%)]"
                    style={{ willChange: 'transform' }}
                ></div>
            </div>
        </div>
    );
});