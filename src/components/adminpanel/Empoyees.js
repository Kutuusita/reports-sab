import UserService from '../../api/user.service';
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react';
const Empoyees = () => {
  const { employees } = useSelector(state => state.users);
  const { message } = useSelector(state => state.message);
  console.log(employees);
  return (
    <div className="employee-list">
      <ul>
        {message}
        {employees?.map((item, id) => <li key={id}>{item.name} {item.internalPhone} {item.role.name}</li>)}
      </ul>
    </div>
  )
}

export default Empoyees;