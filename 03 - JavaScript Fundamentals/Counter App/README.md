# Simple Counter App

A modern and minimal counter application with a stylish interface.

## Features

- **Clean User Interface**: Minimalist design with a centered card layout
- **Custom Typography**: Unique display using Orbitron Google Font
- **Visual Appeal**: Stylish background image for enhanced aesthetics
- **Interactive Elements**: Modern button styles with gradients and hover effects
- **Responsive Design**: Adapts to different screen sizes with max-width container
- **Persistent Tracking**: Saves previous entries for reference

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Orbitron)

## How It Works

1. The counter starts at zero when the page loads
2. Users click the INCREMENT button to increase the count by one
3. The current count is displayed prominently in the counter area
4. Clicking SAVE COUNT preserves the current count to the entry history
5. Previous entries are displayed in a running list below the buttons

## Code Structure

- **index.html**: Main HTML structure and UI elements
- **index.css**: Styling with gradients, custom fonts, and responsive design
- **index.js**: JavaScript logic for counter functionality and saving entries

## Technical Implementation

The counter uses simple JavaScript event listeners to track and display counts:

```javascript
function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    let countStr = count + ' - '
    saveEl.textContent += countStr
    countEl.textContent = 0
    count = 0
}
```

## Installation

No installation required! Simply open the index.html file in any modern web browser.

## Credits

- Part of the Scrimba Frontend Developer Path
- Font: [Orbitron](https://fonts.google.com/specimen/Orbitron) from Google Fonts
