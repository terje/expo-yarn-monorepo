export const luma = (hexColor: string) => {
    let red;
    let green;
    let blue;

    // Check if the color is in shorthand format, e.g. #fff
    if (hexColor.length === 4) {
        red = parseInt(hexColor.charAt(1) + hexColor.charAt(1), 16);
        green = parseInt(hexColor.charAt(2) + hexColor.charAt(2), 16);
        blue = parseInt(hexColor.charAt(3) + hexColor.charAt(3), 16);
    } else {
        red = parseInt(hexColor.substring(1, 3), 16);
        green = parseInt(hexColor.substring(3, 5), 16);
        blue = parseInt(hexColor.substring(5, 7), 16);
    }

    // Calculate the luma value based on the RGB components
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const isDark = (hexColor: string) => luma(hexColor) < 165;

export const statusBarStyle = (backgroundHex: string) => (isDark(backgroundHex) ? 'light' : 'dark');
