/* --- Utility functions ---- */


function hexToRGB(hex) {
    return {
        r: (hex >> 16) & 0xFF,
        g: (hex >> 8) & 0xFF,
        b: hex & 0xFF,
    }
}

function hslToRGB(h, s, l) {
    let r, g, b;

    if (s == 0) return { "r": 255, "g": 255, "b": 255 };

    let hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);

    return { "r": Math.round(r * 255), "g": Math.round(g * 255), "b": Math.round(b * 255) };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {"h": h, "s": s, "l": l};
}



/* ---- Supporter functions ---- */
/**
`A supporter function. Gives the hexadecimal value of the given decimal
@param dec {number} The decimal
@returns {number} The hexadeciaml version of the given decimal`
*/
function getHex(dec) {
    let res = dec.toString(16);
    return (res.length == 1 ? res + res : res).toUpperCase();
}

module.exports = {
    hexToRGB, hslToRGB, getHex, rgbToHsl
}