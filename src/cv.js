/* global __CV_FILE__ */
// Chemin du CV (public/cv/*.pdf) détecté au build. Chaîne vide si aucun PDF n'est présent.
export const CV_FILE = typeof __CV_FILE__ !== 'undefined' ? __CV_FILE__ : '';
