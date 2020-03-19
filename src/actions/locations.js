export const SAVE_LOCATIONS = 'SAVE_LOCATIONS'

export function saveLocations(locations) {
    return {
        type: SAVE_LOCATIONS,
        locations
    }
}