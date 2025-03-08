import fs from 'fs/promises';
import path from 'path';

export const deleteOldImage = async (imageUrl) => {
    const oldFilePath = path.join('public', path.basename(imageUrl));
    try {
        await fs.access(oldFilePath);
    } catch (err) {
        return;
    }

    try {
        await fs.unlink(oldFilePath);
    } catch (err) {
        console.error('Failed to delete old image:', err);
    }
};