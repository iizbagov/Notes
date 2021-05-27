export interface NoteData {
    title: string;
    text: string;
    _id: string;
}

export interface Error {
    hasError: boolean;
    onRetry: () => void;
    onCancel: () => void;    
}

export interface InitialState {
    notes: Array<NoteData>
    error: Error
}

export type Action = {
    type: string;
    notes?: Array<NoteData>; // Так и не получилось корректно заменить
    payload?: Error;
} 

