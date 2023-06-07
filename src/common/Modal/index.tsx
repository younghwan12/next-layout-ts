import { Modal as AntdModal, ModalProps } from "antd"

interface ICustomModalProps {
  size?: "small" | "modal-upload"
}

const Modal: React.FC<ModalProps & ICustomModalProps> = (props) => {
  let modalSize
  if (props.size == "small") {
    modalSize = 572
  } else if (props.className == "modal-upload") {
    modalSize = 491
  } else {
    modalSize = 1000
  }
  return <AntdModal width={modalSize} {...props} centered />
}
export const useModal = AntdModal.useModal
export default Modal
