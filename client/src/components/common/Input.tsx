import styled from "@emotion/styled";

type Props = {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange: (e: any) => void
}

const BaseInput = styled('input')`

`
const StyledInput = ({className}: Props) => {
    return <BaseInput className={className}></BaseInput>
}

function Input (props: Props) {
    return (
        <StyledInput className={props.className} onChange={props.onChange} value={props.value!} placeholder={props.value!}></StyledInput>
    )
}

export default Input;