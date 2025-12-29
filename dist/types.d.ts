/**
 * Represents an entry in a weighted list.
 */
export interface WeightedEntry<T> {
    /**
     * The weight of the entry. Higher values mean the entry is more likely to be selected.
     */
    readonly commonality: number;
    /**
     * The value of the entry.
     */
    readonly value: T;
}
