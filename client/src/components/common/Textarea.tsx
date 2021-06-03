import styled from "@emotion/styled";

type Props = {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange: (e: any) => void
}

const BaseTextarea = styled('textarea')`
  letter-spacing: -0.09em;
`
function Textarea (props: Props) {
    return (
        <BaseTextarea className={props.className} onChange={props.onChange} value={props.value} placeholder={props.value} />
    )
}

export default Textarea;