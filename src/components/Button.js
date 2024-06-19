export function Button(props) {
const style = {
    color: props.color,
    backgroundColor: props.bgcolor,
    width: props.width,
    border: props.border,
    padding: props.padding,
    borderRadius: props.bdradius,
    borderBottom: props.bdbottom,
}
return <button {...props} style={style}>{props.text}</button>
}