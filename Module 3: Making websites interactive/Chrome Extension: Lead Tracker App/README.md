# Chrome Extension: Lead Tracker App

A productivity browser extension for saving important links and website leads.

## Features

- **Quick Link Saving**: Save the URL of your current tab with one click
- **Manual Input**: Add custom URLs or notes via text input
- **Local Storage**: Persistent data saving between browser sessions
- **Double-Click Reset**: Clear all saved leads with a double-click safety feature
- **Compact Interface**: Clean, minimal UI design that fits nicely in browser toolbar
- **One-Click Navigation**: Open any saved lead in a new tab by clicking on it

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Chrome Extension API
- Local Storage API

## How It Works

1. The extension saves URLs in the browser's local storage
2. Users can save the current tab URL with the "SAVE TAB" button
3. Alternatively, users can manually enter URLs or notes in the input field
4. Saved leads appear as clickable links below
5. Double-clicking the DELETE button clears all saved leads

## Code Structure

- **index.html**: Extension popup interface
- **index.css**: Styling for the popup
- **index.js**: Core functionality and local storage management
- **manifest.json**: Chrome extension configuration
- **icon.png**: Extension icon

## Technical Implementation

The extension uses localStorage to persist data between sessions:

```javascript
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

function saveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
}
```

## Installation

1. Download or clone the repository
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The Lead Tracker icon will appear in your browser toolbar

## Credits

- Part of the Scrimba Frontend Developer Path
- Built using Chrome Extension API