export function resObject(status: boolean, data: any = null) {
    return {
        isSuccess: status,
        data: data
    }
}