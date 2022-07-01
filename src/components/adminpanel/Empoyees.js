import UserService from '../../services/user.service';
import {useState} from 'react';
const Empoyees = () => {
  const [employees, setEmployees] = useState([]);
  UserService.getEmployee().then(resp => {
    if (!employees.length)
      setEmployees(resp.data.employee)
  });
  return (
    <div className="employee-list">
      <ul>
        {employees.map((item, id) => <li key={id}>{item.name} {item.internalPhone} {item.role.name}</li>)}
      </ul>
    </div>
  )
}

export default Empoyees;