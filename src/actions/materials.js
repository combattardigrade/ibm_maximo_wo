export const SAVE_MATERIALS = 'SAVE_MATERIALS'

export function saveMaterials(materials) {
    return {
        type: SAVE_MATERIALS,
        materials
    }
}