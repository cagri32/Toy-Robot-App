# Test Instructions for Toy Robot Simulator
## General
1. Load the application in the browser.

2. Confirm that a message appears at the top:
“Click to place the robot, use the buttons or arrows to move”

## Grid Placement
3. Click any cell on the 5x5 grid.

- The robot should appear in that cell.
- A small red arrow should appear, pointing up (default direction is NORTH).

## Controls – Keyboard
4. With the robot placed, press:

- Arrow Up – the robot moves one cell forward.
- Arrow Left – the robot turns left (arrow updates).
- Arrow Right – the robot turns right (arrow updates).

## Controls – Buttons
5. Click the MOVE button.
- The robot moves one cell forward in the current direction.

6. Click LEFT or RIGHT.
- The robot turns left or right. The arrow updates accordingly.

## Report
7. Click the REPORT button.

- The current position and direction should be shown below the buttons, like:
“Position: (2, 3), Direction: EAST”

## Edge Cases
8. Try to move the robot when it is on an edge and facing outside the grid (e.g., at 0,0 facing WEST).
- The robot should not move outside the grid.
9. Reload the page.
- The robot should appear at its last known position and direction if already placed (based on the API response).
