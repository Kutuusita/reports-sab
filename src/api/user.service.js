import api from './api';

const getEmployee = () => {
  return api.post('Employee/GetEmployees', {});
}
const user1 = {
  "id": 'a8b778d5-ba82-11ec-b7a2-00155dd15706',
  "name": "Медведенко Евгений Михайлович",
  "login": "test2",
  "roleId": "f97b7a48-f53b-11ec-8e63-00155d418c54",
  "internalPhone": 123,
  // "password": "string",
  // "active": true,
  // "okDeskId": 26
}
const newUser = {
  "id": 'a8b778d5-ba82-11ec-b7a2-00155dd15706',
  "name": "Медведенко Евгений Михайлович 3",
  'color': '#0000',
  "login": "test2",
  "password": null,
  "roleId": "f97b7a48-f53b-11ec-8e63-00155d418c54",
  "active": true,
  "internalPhone": 123,
  "okDeskId": 26
}
const userAdmin = {
  "id": "959d0524-3408-46a8-b122-fd8fa5cf691b",
  "name": "Антон Игоревич",
  "login": "admin",
  "password": null,
  "roleId": "f97b72ee-f53b-11ec-8e63-00155d418c54",
  "active": true,
  "internalPhone": 987654,
  "okDeskId": 0
}
const addEditEmployee = (userInfo = userAdmin) => {
  return api.post('Employee/AddEditEmployee', { ...userInfo })
            .then( resp => {
              return resp.data;
            })
            .catch( err => {
              console.log(err.code, err.response.data.errors);
            });
}
const restoreEmployee = (id) => {
  return api.post('Employee/RestoreEmployee', {id});
}
const deleteEmployee = (id) => {
  return api.post('Employee/DeleteEmployee', {id});
}


const getRoles = () => {
  return api.post('Employee/GetRoles', {});
}

const UserService = {
  getEmployee,
  addEditEmployee,
  deleteEmployee,
  restoreEmployee,
  getRoles
}
export default UserService;