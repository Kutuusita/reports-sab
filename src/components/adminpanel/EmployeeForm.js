import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Input } from '../common/FormControls/FormControls';

import { composeValidators, mustBeNumber, required } from '../../helpers/validators/validators';

import md5 from 'md5';
import Icons from '../common/Icons';


const EmployeeForm = (props) => {

  const [loading, setLoading] = useState(false);

  const { roles } = useSelector(state => state.users);
  const { employees } = useSelector(state => state.users);
  const { message } = useSelector(state => state.message);
  const [editedEmployee, setEditedEmployee] = useState(null);
  
  const [initialFormValues, setInitialFormValues] = useState({
    id: null, name: null,
    color: null,
    login: null,
    password: null,
    roleId: null,
    active: true,
    internalPhone: 0,
    okDeskId: 0
  });


  const onSubmit = (formData) => {
    const {id, name, login, password, roleId, active, internalPhone, okDeskId, color, file} = formData
    const employeeData = {
      id, name, login, roleId, active,
      color: color || null,
      password: password || null,
      internalPhone: internalPhone || 0,
      okDeskId: okDeskId || 0
    }
    console.log(formData);
  };

  // 
  const onClickEmployee = (e) => {
    setEditedEmployee(e.target.getAttribute('data-id'));
  }
  // 

  useEffect(() => {
    if (editedEmployee && employees) {
      const { id, name, login, role: { id: roleId }, active, color=null, internalPhone, okDeskId } = employees.find(em => em.id === editedEmployee);
      const editedEmployeeFormData = {
        id, name, login,
        roleId, active, color,
        internalPhone, okDeskId
      };
      setInitialFormValues(editedEmployeeFormData)
    }

  }, [editedEmployee, employees]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialFormValues}
      className="user-form__form"
      render={
      ({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
              <div className="title">Создание пользователя</div>

              {/*  */}
              <div data-id='a8b778d5-ba82-11ec-b7a2-00155dd15706' onClick={onClickEmployee}>Пользователь Медведенко Евгений Михайлович 123 Engineer a8b778d5-ba82-11ec-b7a2-00155dd15706</div>
              {/*  */}

              <div className="form-group">
                <Field component={Input} type="file" name="file"/>
              </div>
              <div className="form-group">
                <Field component={Input} type="text" name="name" label="Имя пользователя"/>
              </div>
              <div className="form-group">
                <Field component={Input} type="color" name="color" label="Выбрать цвет" value="#000000"/>
              </div>
              <div className="form-group">
                <Field component={Input} type="checkbox" name="active" className="form-control" label="Активный"/>
              </div>
              <div className="form-group">
                <Field component={Input} type="text" name="login" className="form-control" label="Логин"  autoComplete="username"/>
              </div>
              <div className="form-group">
                <Field component={Input} type="password" name="password" className="form-control" label="Пароль" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <Field component={Input} type="text" name="internalPhone" className="form-control" label="Номер" validate={composeValidators(mustBeNumber)}/>
              </div>
              <div className="form-group">
                <Field component={Input} type="text" name="okDeskId" className="form-control" label="ID okdesk" />
              </div>


              <div className="form-group">
                {
                  roles.map((role, i) => {
                    if (role.name === 'Admin') return null;
                    let name = '';
                    switch(role.name) {
                      case 'Manager':
                        name = 'Менеджер';
                        break;
                      case 'Engineer':
                        name = 'Инженер';
                        break;
                      case 'Accounting':
                        name = 'Бухгалтер';
                        break;
                      default:
                        name = 'Новая роль';
                        break;
                    }
                    const icon = <Icons name={role.name} color="#666666" size="28" className="button-top-panel" />;
                    return <Field key={i} component={Input} type="radio" name="roleId" className="form-control" label={name} value={role.id} validate={required}/>;
                  })
                }
              </div>
              <div className="form-group form-group--button">
                <button className="btn btn-s3" disabled={loading}>
                  {
                  loading
                  ? ( <span className="">Загрузка</span> )
                  : ( <span>Сохранить</span> )
                  }
                </button>
              </div>
              {message && (
                  <div className="" role="alert">
                    {message}
                  </div>
              )}
          </form>
        )
      }
    } />
  )
};
// const EmployeeForm = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();

//   const [active, setActive] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [sip, setSip] = useState("");
//   const [okdeskID, setOkdeskID] = useState("");
//   const [role, setUserRole] = useState("");

//   const [loading, setLoading] = useState(false);

//   const { roles } = useSelector(state => state.users);
//   const { message } = useSelector(state => state.message);

//   const onChangeActive = (e) => {
//     const active = e.target.value;
//     setActive(active);
//   }
//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   }
//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   }
//   const onChangeSip = (e) => {
//     const sip = e.target.value;
//     setSip(sip);
//   }
//   const onChangeOkdeskID = (e) => {
//     const okdeskID = e.target.value;
//     setOkdeskID(okdeskID);
//   }
//   const onChangeRole = (e) => {
//     if (e.target.checked) {
//       const roleId = e.target.value;
//       setUserRole(roleId);
//     }
//   }
//   const handleEditEmployee = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     form.current.validateAll();
//     if (checkBtn.current.context._errors.length === 0) {
//       console.log('Ошибок нет');
//       setTimeout(()=>{

//         setLoading(false);
//       }, 500)
//     } else {
//       console.log('Errors');
//       setTimeout(()=>{

//         setLoading(false);
//       }, 500)
//     }
//   };

//   // const removeApiError = () => {
//   //     form.hideError(userInput);
//   // };

//   return (
//     <div>
//       <Form onSubmit={handleEditEmployee} ref={form} className="user-form__form">
//         <div className="title">Создание пользователя</div>
//         <div className="form-group">
//           <label>
//             <Input
//               type="color"
//               className="form-control"
//               name="color"
//               value='null'
//             />
//             <Icons
//               name="activity"
//               color="#51AF63"
//               size="28"
//               className="button-top-panel"
//             />
//             Активный
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             <Input
//               type="checkbox"
//               className="form-control"
//               name="active"
//               checked="true"
//               onChange={onChangeActive}
//               value='active'
//             />
//             <Icons
//               name="activity"
//               color="#51AF63"
//               size="28"
//               className="button-top-panel"
//             />
//             Выбрать цвет
//           </label>
//         </div>
//         <div className="form-group">
//           <label htmlFor="username">Логин</label>
//           <Input
//             type="text"
//             className="form-control"
//             name="username"
//             value={username}
//             onChange={onChangeUsername}
//             validations={[required]}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Пароль</label>
//           <Input
//             className="form-control"
//             autoComplete="new-password"
//             type="password"
//             name="password"
//             value={password}
//             onChange={onChangePassword}
//             validations={[required]}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="sip">Номер</label>
//           <Input
//             type="text"
//             className="form-control"
//             name="sip"
//             value={sip}
//             onChange={onChangeSip}
//             validations={[required]}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="okdeskID">ID okdesk</label>
//           <Input
//             type="text"
//             className="form-control"
//             name="okdeskID"
//             value={okdeskID}
//             onChange={onChangeOkdeskID}
//             validations={[required]}
//           />
//         </div>
//         <div className="form-group">
//           {
//             roles.map((role, i) => {
//               if (role.name === 'Admin') return;
//               let name = '';
//               switch(role.name) {
//                 case 'Manager':
//                   name = 'Менеджер';
//                   break;
//                 case 'Engineer':
//                   name = 'Инженер';
//                   break;
//                 case 'Accounting':
//                   name = 'Бухгалтер';
//                   break;
//                 default:
//                   name = 'Новая роль';
//                   break;
//               }
//               return (
//                   <label key={i}>
//                     <Input
//                       type="radio"
//                       className="form-control"
//                       name="role"
//                       checked={i === 0 ? true : false}
//                       onChange={onChangeRole}
//                       value={role.id}
//                       validations={[required]}
//                     />
//                     <Icons
//                       name={role.name}
//                       color="#666666"
//                       size="28"
//                       className="button-top-panel"
//                     />
//                     {name}
//                   </label>
//               )
//             })
//           }
//         </div>
//         <div className="form-group form-group--button">
//           <button className="btn btn-s3" disabled={loading}>
//             {
//             loading
//             ? ( <span className="">Загрузка</span> )
//             : ( <span>Сохранить</span> )
//             }
//           </button>
//         </div>
//         {message && (

//             <div className="" role="alert">
//               {message}
//             </div>
//         )}
//         <CheckButton style={{ display: "none" }} ref={checkBtn} />
//       </Form>
//     </div>
//   )
// }

export default EmployeeForm;