export const InputGroup = ({label, type, name, value, onChange}) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input className="form-control border border-primary" type={type ? type : "text"} name={name} value={value} onChange={onChange} required/>
        </div>
    )
}