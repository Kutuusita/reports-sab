// export const required = value => {
//   if (value) return undefined;

//   return 'Field is required';
// }

export const maxLength = (maxLength) => (value) => {
  if (value && value.length > maxLength) return `Максимальная длиина ${maxLength} симв.`;
  return undefined;
}
export const minLength = (minLength) => (value) => {
  if (value && value.length < minLength) return `Минимальная длиина ${minLength} симв.`;
  return undefined;
}

export const required = (value) => {
  if (!value) {
    return (
      <div className="required-field-info" role="alert" style={{'position':'absolute'}}>
        Это поле обязательно!
      </div>
    );
  }
  return undefined;
};

export const mustBeNumber = (value) => {
  if (isNaN(value)) {
    return (
      <div className="required-field-info" role="alert" style={{'position':'absolute'}}>
        Должно быть числовое значение
      </div>
    );
  }
  return undefined;
}

export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);