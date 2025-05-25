import React, { useEffect, useState } from 'react';
import './RobotSimulator.css';

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
      const res = await fetch(`${API_BASE}/last`);
      if (!res.ok) {
        setRobot(null);
        return;
      }
      const data = await res.json();
      setRobot(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        sendCommand('move');
        break;
      case 'ArrowLeft':
        sendCommand('left');
        break;
      case 'ArrowRight':
        sendCommand('right');
        break;
      default:
        break;
    }
  };

  const getRobotSymbol = (direction: string) => {
    switch (direction) {
      case 'NORTH':
        return '🤖↑';
      case 'SOUTH':
        return '🤖↓';
      case 'EAST':
        return '🤖→';
      case 'WEST':
        return '←🤖';
      default:
        return '🤖';
    }
  };

  useEffect(() => {
    reportPosition();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="app-wrapper">
      <p>Click to place the robot, use the buttons or arrows to move</p>

      <div className="container">
        {[4, 3, 2, 1, 0].map((y) => (
          <div key={y} className="row">
            {[0, 1, 2, 3, 4].map((x) => {
              const isRobot = robot && robot.x === x && robot.y === y;
              return (
                <div
                  key={x}
                  onClick={() => placeRobot(x, y)}
                  className={`cell ${isRobot ? 'robot' : ''}`}
                >
                  {isRobot ? getRobotSymbol(robot!.direction) : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="button-container">
        <div className="button-row">
          <button onClick={() => sendCommand('move')}>MOVE</button>
          <button onClick={() => sendCommand('left')}>LEFT</button>
          <button onClick={() => sendCommand('right')}>RIGHT</button>
        </div>
        <button onClick={reportPosition} className="report-button">
          REPORT
        </button>
      </div>

      <div className="position-container">
        {robot ? (
          <div>
            Position: ({robot.x}, {robot.y}), Direction: {robot.direction}
          </div>
        ) : (
          <div>Robot not placed yet</div>
        )}
      </div>
    </div>
  );
};

export default RobotSimulator;