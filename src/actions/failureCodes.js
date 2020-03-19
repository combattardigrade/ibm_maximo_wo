export const SAVE_FAILURE_CODES = 'SAVE_FAILURE_CODES'

export function saveFailureCodes(failureCodes) {
    return {
        type: SAVE_FAILURE_CODES,
        failureCodes
    }
}