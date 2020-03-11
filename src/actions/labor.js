export const SAVE_LABOR_CATALOG = 'SAVE_LABOR_CATALOG'

export function saveLaborCatalog(laborCatalog) {
    return {
        type: SAVE_LABOR_CATALOG,
        laborCatalog
    }
}