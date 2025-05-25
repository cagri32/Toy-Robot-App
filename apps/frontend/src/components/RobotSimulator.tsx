import React, { useState } from 'react';

type Robot = {
  x: number;
  y: number;
  direction: string;
};

const RobotSimulator: React.FC = () => {
  const [robot, setRobot] = useState<Robot | null>(null);

  const placeRobot = (x: number, y: number) => {
    // placeholder, no API yet
    setRobot({ x, y, direction: 'NORTH' });
  };

  return (
    <div>
      <h1>Toy Robot Simulator</h1>

      <div style={{ display: 'inline-block', border: '1px solid black' }}>
        {[4, 3, 2, 1, 0].map((y) => (
          <div key={y} style={{ display: 'flex' }}>
            {[0, 1, 2, 3, 4].map((x) => {
              const isRobot = robot && robot.x === x && robot.y === y;
              return (
                <div
                  key={x}
                  onClick={() => placeRobot(x, y)}
                  style={{
                    width: 50,
                    height: 50,
                    border: '1px solid gray',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: isRobot ? 'lightcoral' : undefined,
                    color: isRobot ? 'white' : undefined,
                    fontWeight: isRobot ? 'bold' : undefined,
                    userSelect: 'none',
                  }}
                >
                  {isRobot ? '🤖' : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RobotSimulator;
