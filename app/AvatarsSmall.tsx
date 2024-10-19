import React from 'react';
import Svg, { Circle, Path, Rect, Ellipse, Polygon } from 'react-native-svg';

const Avatar1 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" strokeWidth="5" />
    <Circle cx="100" cy="100" r="40" fill="#ffd1a9" />
    <Circle cx="85" cy="95" r="5" fill="#000" />
    <Circle cx="115" cy="95" r="5" fill="#000" />
    <Path d="M85,115 Q100,130 115,115" stroke="#000" strokeWidth="3" fill="none" />
    <Rect x="60" y="55" width="80" height="15" fill="#90E24A" />
    <Ellipse cx="100" cy="65" rx="50" ry="10" fill="#90E24A" />
    <Circle cx="70" cy="70" r="3" fill="#fff" />
    <Circle cx="130" cy="70" r="3" fill="#fff" />
    </Svg>
);

const Avatar2 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" strokeWidth="5" />
    <Circle cx="100" cy="100" r="50" fill="#ffd1a9" />
    <Circle cx="85" cy="90" r="5" fill="#000" />
    <Circle cx="115" cy="90" r="5" fill="#000" />
    <Path d="M85,115 Q100,130 115,115" stroke="#000" strokeWidth="3" fill="none" />
    <Rect x="60" y="55" width="80" height="20" fill="#37474F" />
    <Rect x="75" y="55" width="50" height="10" fill="#1E88E5" />
    <Circle cx="100" cy="60" r="7" fill="#FFD700" stroke="#000" strokeWidth="1" />
    <Rect x="60" y="120" width="80" height="40" fill="#1E88E5" />
    <Rect x="90" y="130" width="20" height="10" fill="#FFD700" />
    <Rect x="130" y="130" width="5" height="20" fill="#000" />
</Svg>
);

const Avatar3 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" strokeWidth="5" />
    <Path d="M50,140 Q75,90 100,140 T150,140 Q140,120 130,100 T110,70 Q100,60 90,70 T70,100 Q60,120 50,140 Z" 
          fill="#76c893" stroke="#4a9e69" strokeWidth="5" />
    <Circle cx="120" cy="80" r="5" fill="#000" />
    <Ellipse cx="100" cy="120" rx="20" ry="10" fill="#f4d1a1" />
    <Rect x="70" y="130" width="10" height="20" fill="#4a9e69" />
    <Rect x="120" y="130" width="10" height="20" fill="#4a9e69" />
    <Path d="M50,140 Q30,120 40,100" fill="none" stroke="#76c893" strokeWidth="5" />
</Svg>

);

const Avatar4 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" strokeWidth="5" />
    <Circle cx="100" cy="100" r="50" fill="#d3d3d3" stroke="#ccc" strokeWidth="3" />
    <Rect x="70" y="110" width="60" height="40" fill="#8d8d8d" />
    <Circle cx="100" cy="90" r="30" fill="#ffffff" stroke="#000" strokeWidth="2" />
    <Rect x="85" y="110" width="30" height="20" fill="#ffffff" />
    <Rect x="95" y="115" width="10" height="5" fill="#000" />
    <Circle cx="100" cy="90" r="10" fill="#87CEEB" />
</Svg>

);

const Avatar5 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" strokeWidth="5" />
    <Rect x="65" y="80" width="70" height="60" rx="15" ry="15" fill="#b0c4de" stroke="#7f8c8d" strokeWidth="4" />
    <Rect x="85" y="60" width="30" height="20" rx="5" ry="5" fill="#b0c4de" stroke="#7f8c8d" strokeWidth="3" />
    <Circle cx="85" cy="100" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
    <Circle cx="115" cy="100" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
    <Rect x="90" y="115" width="20" height="5" fill="#000" />
    <Rect x="70" y="130" width="10" height="15" fill="#7f8c8d" />
    <Rect x="120" y="130" width="10" height="15" fill="#7f8c8d" />
</Svg>

);

const Avatar6 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" stroke-width="5" />
    <Rect x="60" y="70" width="80" height="60" rx="15" ry="15" fill="#d32f2f" stroke="#7f8c8d" stroke-width="4" />
    <Rect x="70" y="80" width="60" height="20" rx="5" ry="5" fill="#b0c4de" stroke="#7f8c8d" stroke-width="3" />
    <Circle cx="85" cy="100" r="4" fill="#fff" stroke="#000" stroke-width="2" />
    <Circle cx="115" cy="100" r="4" fill="#fff" stroke="#000" stroke-width="2" />
    <Rect x="90" y="115" width="20" height="5" fill="#000" />
    <Rect x="75" y="135" width="50" height="10" fill="#000" />
    <Rect x="70" y="150" width="15" height="20" fill="#7f8c8d" />
    <Rect x="115" y="150" width="15" height="20" fill="#7f8c8d" />
</Svg>
);

const Avatar7 = () => (
    <Svg width="80" height="80" viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="80" fill="#f0f0f0" stroke="#ccc" stroke-width="5" />
    <Polygon points="60,70 140,70 100,30" fill="#4b0082" stroke="#7f8c8d" stroke-width="4" />
    <Rect x="65" y="70" width="70" height="10" fill="#4b0082" stroke="#7f8c8d" stroke-width="4" />
    <Rect x="65" y="80" width="70" height="60" rx="15" ry="15" fill="#9370db" stroke="#7f8c8d" stroke-width="4" />
    <Circle cx="85" cy="100" r="4" fill="black" stroke="black" stroke-width="1" />
    <Circle cx="115" cy="100" r="4" fill="black" stroke="black" stroke-width="1" />
    <Rect x="90" y="115" width="20" height="5" fill="#000" />
    <Rect x="85" y="120" width="30" height="15" fill="#7f8c8d" />
    <Rect x="70" y="140" width="5" height="25" fill="#8b4513" />
    <Circle cx="72.5" cy="135" r="5" fill="#ffeb3b" />
</Svg>
);

const avatarsSmall = [
  { name: 'Avatar1', value: <Avatar1 /> },
  { name: 'Avatar2', value: <Avatar2 /> },
  { name: 'Avatar3', value: <Avatar3 /> },
  { name: 'Avatar4', value: <Avatar4 /> },
  { name: 'Avatar5', value: <Avatar5 /> },
  { name: 'Avatar6', value: <Avatar6 /> },
  { name: 'Avatar7', value: <Avatar7 /> },
];

export default avatarsSmall;


