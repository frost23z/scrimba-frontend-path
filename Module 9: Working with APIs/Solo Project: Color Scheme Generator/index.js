const colorPicker = document.getElementById('colorPicker');
const schemeSelect = document.getElementById('schemeSelect');
const generateBtn = document.getElementById('generateBtn');
const colorScheme = document.getElementById('colorScheme');

// Initialization
showEmptyState();

generateBtn.addEventListener('click', generateColorScheme);

async function generateColorScheme() {
    const seedColor = colorPicker.value.substring(1); // Remove # from hex
    const mode = schemeSelect.value;
    const count = 5; // Default 5 colors
    
    try {
        generateBtn.textContent = 'Generating...';
        generateBtn.disabled = true;
        
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=${count}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch color scheme');
        }
        
        const data = await response.json();
        displayColorScheme(data.colors);
        
    } catch (error) {
        console.error('Error generating color scheme:', error);
        showErrorState();
    } finally {
        generateBtn.textContent = 'Get color scheme';
        generateBtn.disabled = false;
    }
}

function displayColorScheme(colors) {
    colorScheme.innerHTML = '';
    
    colors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item';
        colorItem.style.backgroundColor = color.hex.value;
        
        const hexValue = document.createElement('div');
        hexValue.className = 'color-hex';
        hexValue.textContent = color.hex.value;
        
        colorItem.appendChild(hexValue);
        
        colorItem.addEventListener('click', () => copyToClipboard(color.hex.value, colorItem));
        
        colorScheme.appendChild(colorItem);
    });
}

async function copyToClipboard(hexValue, colorItem) {
    try {
        await navigator.clipboard.writeText(hexValue);
        
        colorItem.classList.add('copied');
        const hexElement = colorItem.querySelector('.color-hex');
        const originalText = hexElement.textContent;
        hexElement.textContent = 'Copied!';
        
        setTimeout(() => {
            colorItem.classList.remove('copied');
            hexElement.textContent = originalText;
        }, 1000);
        
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        fallbackCopyToClipboard(hexValue, colorItem);
    }
}

function fallbackCopyToClipboard(text, colorItem) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        
        colorItem.classList.add('copied');
        const hexElement = colorItem.querySelector('.color-hex');
        const originalText = hexElement.textContent;
        hexElement.textContent = 'Copied!';
        
        setTimeout(() => {
            colorItem.classList.remove('copied');
            hexElement.textContent = originalText;
        }, 1000);
        
    } catch (error) {
        console.error('Fallback copy failed:', error);
    }
    
    document.body.removeChild(textArea);
}

function showEmptyState() {
    colorScheme.innerHTML = '<div class="empty-state">Choose a seed color and click "Get color scheme" to generate your palette</div>';
}

function showErrorState() {
    colorScheme.innerHTML = '<div class="empty-state">Something went wrong. Please try again.</div>';
}

window.addEventListener('load', generateColorScheme);
