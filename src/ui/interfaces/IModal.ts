export interface ModalProps {
    type: string,
    text: string,
    clickFunction(): void
}

export interface ModalState {
    open: boolean
}