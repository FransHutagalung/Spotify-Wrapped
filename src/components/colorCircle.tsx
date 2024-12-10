// import React from 'react';

const ColorCircle = ({ color, isUsed }: { color: string[]; isUsed: boolean }) => {
    return (
        <div className="w-12 h-12 rounded-md relative">
          <div
            className={`w-full h-full rounded-md ${isUsed ? "border-4 border-white" : ""}`}
            style={{
              background: `linear-gradient(to right, ${color[0]} 0%, ${color[1]} 50%, ${color[2]} 100%)`,
            }}
          ></div>
        </div>
      );

};

export default ColorCircle;
