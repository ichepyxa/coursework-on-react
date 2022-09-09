import { setNotification } from "../store/slices/notificationSlice"

export default function displayTroubleConnectionError(dispatch: CallableFunction, error: any): void {
  if (error.response.status === 0) {
    dispatch(
      setNotification({
        message: 'Проблемы с соединением',
        errors: [],
        isError: true,
      })
    )
    return
  }

  dispatch(setNotification({ ...error.response?.data, isError: true }))
}