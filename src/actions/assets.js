export const SAVE_ASSETS = 'SAVE_ASSETS'

export function saveAssets(assets) {
    return {
        type: SAVE_ASSETS,
        assets
    }
}