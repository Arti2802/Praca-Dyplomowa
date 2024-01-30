import ReactLoading from 'react-loading';

export const Loading = ({color, size}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ReactLoading type='spin' color={color ? color : '#0000ff'} height={size ? size : '64px'} width={size ? size : '64px'}/>
        </div>
    )
}