export const SAVE_INVENTORY = 'SAVE_INVENTORY'

export function saveInventory(inventory) {
    return {
        type: SAVE_INVENTORY,
        inventory
    }
}