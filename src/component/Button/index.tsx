import { Button as AntdButton, ButtonProps } from "antd"
import { Ripple } from "primereact/ripple"

const Button = (props: ButtonProps) => {
  return (
    <AntdButton type="primary" className="p-ripple" {...props}>
      {props.name}
      <Ripple />
    </AntdButton>
  )
}

export default Button
