/**
 * Convert column letter to index (A=0, B=1, Z=25, AA=26, etc.)
 */
function columnLetterToIndex(letter) {
    let index = 0;
    for (let i = 0; i < letter.length; i++) {
        index = index * 26 + (letter.charCodeAt(i) - 64);
    }
    return index - 1;
}
