import styled from "@emotion/styled";

type Props = {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange: (e: any) => void
}

const BaseInput = styled('input')`

`

function Input (props: Props) {
    return (
        <BaseInput className={props.className} onChange={props.onChange} value={props.value} placeholder={props.value} />
    )
}

export default Input;