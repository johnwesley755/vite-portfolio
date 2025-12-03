import React from 'react';
import { Award } from 'lucide-react';

// Define the structure for a single timeline item (node/orbiting body)
export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType; // Lucide-React Component
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
  image?: string;
}

// Props for the RadialOrbitalTimeline component
interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// A utility to assign a color based on status for the mock-up
const statusColorMap: { [key: string]: string } = {
  completed: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  pending: 'bg-red-500',
};

const RadialOrbitalTimeline: React.FC<RadialOrbitalTimelineProps> = ({ timelineData }) => {
  // Center component for the "Sun" or core of the visualization
  const CenterOrb = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white font-bold text-sm z-30">
      <Sparkles className="w-8 h-8 animate-pulse" />
    </div>
  );

  // Helper to calculate mock positions and rotations for a radial effect
  const calculateMockPosition = (index: number) => {
    const totalItems = timelineData.length;
    // Angle distribution (in radians)
    const angle = (index / totalItems) * 2 * Math.PI;
    // Base radius for orbits (in pixels)
    const baseRadius = 250;
    const radius = baseRadius + (index % 3) * 50; // Simple staggered orbits
    
    // Calculate X and Y positions
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Apply rotation for a visual orbital animation
    const rotation = (index * 360) / totalItems; 

    return { 
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg) rotate(0deg)`,
      transition: 'transform 0.5s ease-out', // For smooth interaction if this were a real D3 component
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center of the universe */}
      <CenterOrb />

      {/* Orbits (Mock rings) */}
      {[250, 300, 350, 400].map((r, i) => (
          <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-dashed border-gray-700/50 rounded-full animate-spin-slow-less"
              style={{ width: `${2 * r}px`, height: `${2 * r}px` }}
          />
      ))}


      {/* Orbiting Bodies (Nodes) */}
      {timelineData.map((item, index) => {
        const Icon = item.icon || Award;
        const colorClass = statusColorMap[item.status] || 'bg-gray-500';

        return (
          <div
            key={item.id}
            className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full cursor-pointer hover:scale-125 transition-transform duration-300 shadow-lg flex items-center justify-center z-40 group"
            style={calculateMockPosition(index)}
            // Mock interaction: clicking would typically update state/context
            onClick={() => console.log('Node clicked:', item.title)}
            title={item.title}
          >
            <div className={`w-full h-full ${colorClass} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Hover tooltip for better UX */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.title} - {item.date}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RadialOrbitalTimeline;