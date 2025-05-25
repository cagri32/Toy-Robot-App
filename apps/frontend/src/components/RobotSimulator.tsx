import React, { useState } from 'react';

type Robot = {
  x: number;
  y: number;
  direction: string;
};

const API_BASE = '/api/robot';

const RobotSimulator: React.FC = () => {
  const [robot, setRobot] = useState<Robot | null>(null);

  const placeRobot = async (x: number, y: number) => {
    try {
      const res = await fetch(`${API_BASE}/place`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y, direction: 'NORTH' }),
      });
      const data = await res.json();
      setRobot(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendCommand = async (command: 'move' | 'left' | 'right') => {
    try {
      const res = await fetch(`${API_BASE}/${command}`, { method: 'POST' });
      const data = await res.json();
      setRobot(data);
    } catch (error) {
      console.error(error);
    }
  };

  const reportPosition = async () => {
    try {
      const res = await fetch(`${API_BASE}/report`);
      const data = await res.json();
      setRobot(data);
    } catch (error) {
      console.error(error);
    }
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

      <div style={{ marginTop: 10 }}>
        <button onClick={() => sendCommand('move')}>MOVE</button>
        <button onClick={() => sendCommand('left')}>LEFT</button>
        <button onClick={() => sendCommand('right')}>RIGHT</button>
        <button onClick={reportPosition} style={{ marginLeft: 10 }}>
          REPORT
        </button>
      </div>
    </div>
  );
};

export default RobotSimulator;
