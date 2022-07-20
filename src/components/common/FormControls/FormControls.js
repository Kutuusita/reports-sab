import s from './FormControls.module.scss';

const FormControl = ({input, meta, children, ...props}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + (hasError ? ' ' + s.error : '')}>
      { hasError && <div><span>{meta.error}</span></div> }
      <div>
        { children }
      </div>
    </div>
  )
}

export const Textarea = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>;
}

export const Input = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}>
          <label>
            <input {...input} {...restProps} />
            {restProps.label}
          </label>
        </FormControl>;
}

export const SummaryError = (props) => {
  return (
    <div className={s.formSummaryError}>
      ERROR: {props.error}
    </div>
  )
}