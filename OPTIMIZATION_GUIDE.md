# WebGL Optimization Guide - Manual Instructions

## ✅ Files Already Optimized
1. **HeroSection.tsx** - COMPLETED
2. **Globe.tsx** - Already optimized
3. **useLazy3D.ts** - NEW lazy-loading hook created

## 📝 Files Requiring Manual Optimization

### 1. SkillsSection.tsx

**Location:** `frontend/src/components/sections/SkillsSection.tsx`

**Changes to make:**

#### A. Add lazy-loading import (line 1)
```tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/Card';
import * as THREE from 'three';
import { GlowingEffect } from '../ui/glowing-effect';
import { useLazy3D } from '../../hooks/useLazy3D'; // ADD THIS LINE
```

#### B. Add model preloading (after SkillsModel component, around line 29)
```tsx
// Preload the model to prevent loading delays
useGLTF.preload('/models/glass-hologram.glb');
```

#### C. Update Canvas configuration (around line 180-185)
**FIND:**
```tsx
<Canvas 
  shadows 
  dpr={[1, 2]} 
  gl={{ alpha: true, antialias: true }}
  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.25 }}
>
```

**REPLACE WITH:**
```tsx
<Canvas 
  shadows 
  dpr={[1, 2]} 
  gl={{ 
    alpha: true, 
    antialias: false,
    powerPreference: "high-performance"
  }}
  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.25 }}
>
```

#### D. Remove intensity prop from Environment (around line 209)
**FIND:**
```tsx
<Environment preset="city" intensity={2} />
```

**REPLACE WITH:**
```tsx
<Environment preset="city" />
```

#### E. Add lazy-loading wrapper (in SkillsSection component, around line 175)
**FIND:**
```tsx
const SkillsSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
```

**REPLACE WITH:**
```tsx
const SkillsSection = () => {
  const { ref, isVisible } = useLazy3D(0.1, '200px');
  
  return (
    <section ref={ref} className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
```

#### F. Conditionally render Canvas (wrap the Canvas div, around line 178)
**FIND:**
```tsx
<div className="absolute inset-0 w-full h-full mt-80">
  <Canvas 
```

**REPLACE WITH:**
```tsx
<div className="absolute inset-0 w-full h-full mt-80">
  {isVisible && (
    <Canvas 
```

**AND ADD closing bracket before the closing div:**
```tsx
    </Canvas>
  )}
</div>
```

---

### 2. AboutSection.tsx

**Location:** `frontend/src/components/sections/AboutSection.tsx`

**Changes to make:**

#### A. Add lazy-loading import (line 1)
```tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import * as THREE from 'three';
import { useLazy3D } from '../../hooks/useLazy3D'; // ADD THIS LINE
```

#### B. Add model preloading (after AboutModel component, around line 28)
```tsx
// Preload the model
useGLTF.preload('/models/About.glb');
```

#### C. Update Canvas configuration (around line 108)
**FIND:**
```tsx
<Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
```

**REPLACE WITH:**
```tsx
<Canvas shadows dpr={[1, 2]} gl={{ 
  alpha: true, 
  antialias: false,
  powerPreference: "high-performance"
}}>
```

#### D. Remove intensity prop from Environment (around line 129)
**FIND:**
```tsx
<Environment preset="sunset" intensity={2.5} />
```

**REPLACE WITH:**
```tsx
<Environment preset="sunset" />
```

#### E. Add lazy-loading wrapper (in AboutSection component, around line 31)
**FIND:**
```tsx
const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
```

**REPLACE WITH:**
```tsx
const AboutSection: React.FC = () => {
  const { ref, isVisible } = useLazy3D(0.1, '200px');
  
  return (
    <section ref={ref} className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
```

#### F. Conditionally render Canvas (around line 107-108)
**FIND:**
```tsx
<div className="w-full h-full">
  <Canvas shadows dpr={[1, 2]}
```

**REPLACE WITH:**
```tsx
<div className="w-full h-full">
  {isVisible && (
    <Canvas shadows dpr={[1, 2]}
```

**AND ADD closing bracket before the closing div (around line 130):**
```tsx
    </Canvas>
  )}
</div>
```

---

### 3. ProjectsSection.tsx

**Location:** `frontend/src/components/sections/ProjectsSection.tsx`

**Changes to make:**

#### A. Add lazy-loading import (line 1, add to existing imports)
```tsx
import { useLazy3D } from "../../lib/useLazy3D"; // ADD THIS LINE
```

#### B. Reduce number of Blobs (around line 477-481)
**FIND:**
```tsx
<Suspense fallback={null}>
  <Blob position={[15, 10, -20]} scale={5} color="#5A00FF" speed={1.0} distort={0.6} rotationSpeed={0.5} />
  <Blob position={[-15, -10, -25]} scale={6} color="#00FFFF" speed={0.8} distort={0.7} rotationSpeed={0.4} />
  <Blob position={[0, 20, -30]} scale={4} color="#FF00FF" speed={1.2} distort={0.5} rotationSpeed={0.6} />
</Suspense>
```

**REPLACE WITH (only 2 blobs):**
```tsx
<Suspense fallback={null}>
  <Blob position={[15, 10, -20]} scale={5} color="#5A00FF" speed={1.0} distort={0.6} rotationSpeed={0.5} />
  <Blob position={[-15, -10, -25]} scale={6} color="#00FFFF" speed={0.8} distort={0.7} rotationSpeed={0.4} />
</Suspense>
```

#### C. Update Canvas configuration (around line 463-467)
**FIND:**
```tsx
<Canvas 
  shadows 
  dpr={[1, 2]} 
  gl={{ alpha: true, antialias: true }}
  className="bg-transparent"
>
```

**REPLACE WITH:**
```tsx
<Canvas 
  shadows 
  dpr={[1, 2]} 
  gl={{ 
    alpha: true, 
    antialias: false,
    powerPreference: "high-performance"
  }}
  className="bg-transparent"
>
```

#### D. Remove intensity prop from Environment (around line 495)
**FIND:**
```tsx
<Environment preset="night" intensity={0.15} />
```

**REPLACE WITH:**
```tsx
<Environment preset="night" />
```

#### E. Add lazy-loading wrapper (in ProjectsSection component, around line 410)
**FIND:**
```tsx
const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const { selectedSkill } = useInteraction();
```

**REPLACE WITH:**
```tsx
const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const { selectedSkill } = useInteraction();
  const { ref: sectionRef, isVisible } = useLazy3D(0.1, '200px');
```

#### F. Add ref to section (around line 451)
**FIND:**
```tsx
<section
  className="w-full min-h-screen relative overflow-hidden bg-gray-950/90" 
  id="projects"
>
```

**REPLACE WITH:**
```tsx
<section
  ref={sectionRef}
  className="w-full min-h-screen relative overflow-hidden bg-gray-950/90" 
  id="projects"
>
```

#### G. Conditionally render Canvas (around line 461-462)
**FIND:**
```tsx
<div className="absolute inset-0 z-0 opacity-50">
  <ErrorBoundary>
    <Canvas 
```

**REPLACE WITH:**
```tsx
<div className="absolute inset-0 z-0 opacity-50">
  {isVisible && (
    <ErrorBoundary>
      <Canvas 
```

**AND ADD closing bracket before the closing div (around line 497-498):**
```tsx
      </Canvas>
    </ErrorBoundary>
  )}
</div>
```

---

## 🧪 Testing Instructions

After making all changes:

1. **Check for TypeScript errors:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser console** and check for:
   - ✅ No "WebGL: CONTEXT_LOST" errors
   - ✅ No "Received `true` for non-boolean attribute `jsx`" warnings
   - ✅ Reduced number of WebGL contexts (should see fewer context creations)

4. **Test lazy-loading:**
   - Scroll slowly through the page
   - 3D models should only load when their sections come into view
   - Check Network tab - models should load on-demand

5. **Performance check:**
   - Open Chrome DevTools > Performance
   - Record while scrolling through the page
   - Check GPU usage and FPS (should be smoother)

---

## 📊 Expected Results

### Before Optimization:
- 5 WebGL contexts created immediately
- Multiple "CONTEXT_LOST" errors
- High initial memory usage
- Potential crashes on lower-end devices

### After Optimization:
- WebGL contexts created on-demand (lazy-loaded)
- No context loss errors
- Lower memory footprint
- Smoother scrolling and animations
- Better performance on all devices

---

## 🔧 Troubleshooting

### If you still see context loss errors:
1. Check browser console for specific error messages
2. Verify all `scene.clone()` calls are removed
3. Ensure all models are preloaded
4. Check that Canvas `gl` props include `powerPreference: "high-performance"`

### If lazy-loading doesn't work:
1. Verify `useLazy3D` hook is imported correctly
2. Check that `ref` is attached to the section element
3. Ensure `isVisible &&` wraps the Canvas component
4. Check browser console for Intersection Observer errors

### If models don't load:
1. Verify model paths are correct
2. Check Network tab for 404 errors
3. Ensure `useGLTF.preload()` is called outside components

---

## 📝 Summary of Key Changes

1. ✅ **Removed `scene.clone()`** - Prevents memory duplication
2. ✅ **Added model preloading** - Faster initial load
3. ✅ **Optimized Canvas config** - Better performance
4. ✅ **Removed unsupported props** - No warnings
5. ✅ **Reduced blob count** - Less GPU overhead
6. ✅ **Implemented lazy-loading** - On-demand 3D rendering
7. ✅ **Added Intersection Observer** - Smart resource management

---

## 🎯 Next Steps

After completing all optimizations:
1. Test thoroughly in different browsers
2. Test on mobile devices
3. Monitor performance metrics
4. Consider adding loading states for 3D content
5. Implement error boundaries for each Canvas

---

**Need help?** Check the WEBGL_OPTIMIZATION_REPORT.md for detailed analysis.
