import styled from "@emotion/styled";

type Props = {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange: (e: any) => void
}

const BaseTextarea = styled('textarea')`
  letter-spacing: 0.09em;
`
const StyledTextarea = ({className}: Props) => {
    return <BaseTextarea className={className}></BaseTextarea>
}

function Textarea (props: Props) {
    return (
        <StyledTextarea className={props.className} onChange={props.onChange} value={props.value!} placeholder={props.value!}></StyledTextarea>
    )
}

export default Textarea;