export interface KernelProps {

}

export interface KernelState {
    [index: string]: any,
    step: string,
    flowControllerStepOverride: string,
    isLoading: boolean,
    personalInfo: any,
    isStandalone: boolean
    authIndex: number
}