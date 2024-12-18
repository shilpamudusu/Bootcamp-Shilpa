// Select elements
const colorPicker = document.getElementById('color-picker');
const opacitySlider = document.getElementById('opacity');
const saturationSlider = document.getElementById('saturation');
const lightnessSlider = document.getElementById('lightness');
const samplePage = document.getElementById('sample-page');
const variationBoxes = document.getElementById('variation-boxes');

// Function to apply color changes
function updateColor() {
    const color = colorPicker.value;
    const opacity = opacitySlider.value / 100;
    const saturation = saturationSlider.value;
    const lightness = lightnessSlider.value;

    // Generate HSL color
    const hslColor = `hsla(${hexToHSL(color).h}, ${saturation}%, ${lightness}%, ${opacity})`;

    // Apply color to the sample page
    samplePage.style.color = hslColor;
    samplePage.style.borderColor = hslColor;

    // Update variations
    updateVariations(color);
}

// Function to generate color variations
function updateVariations(baseColor) {
    variationBoxes.innerHTML = ''; // Clear previous variations
    const hsl = hexToHSL(baseColor);

    // Generate variations
    for (let i = 1; i <= 5; i++) {
        const newLightness = Math.max(0, Math.min(100, hsl.l + i * 10 - 20));
        const variationColor = `hsl(${hsl.h}, ${hsl.s}%, ${newLightness}%)`;

        const box = document.createElement('div');
        box.className = 'variation';
        box.style.backgroundColor = variationColor;
        variationBoxes.appendChild(box);
    }
}

// Helper: Convert HEX to HSL
function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Event Listeners
colorPicker.addEventListener('input', updateColor);
opacitySlider.addEventListener('input', updateColor);
saturationSlider.addEventListener('input', updateColor);
lightnessSlider.addEventListener('input', updateColor);

// Initial update
updateColor();
