import { capitalize } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ApproveRejectForm from './ApproveRejectForm';
import { useHistory } from 'react-router-dom';

function ListOfAppliedCandidates(props) {

  const [formData, setFormData] = useState({})
  const [preFillData, setPrefillData] = useState({})
  const [showForm, setShowForm] = useState(false)

  const history = useHistory();

    useEffect(()=>{
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        if(!employee)
            history.push('login')
    })

  const loadData = async () => {
    let u = localStorage.getItem('user');
    let employee = JSON.parse(u)
    const response = await axios.get(
      `http://localhost:9002/candidateDetails/${formData.email}/${props.data._id}`);
    setPrefillData(response.data.data.usersData[0]);
    setShowForm(true)
  }
  //`http://localhost:9002/candidateDetails/${formData.email}/${props.data._id}`);
  
  useEffect(() => {
    if(formData?.email)
    loadData();
  }, [formData]);


  const [users, setUsers] = useState(props?.data?.applied)
  let columns = ['S. No', 'Name', 'Email Id', 'status', 'Filled Application']
  const renderUsers = () => {
    return users?.map((e, id) => {
      return <tr key={id} >
        <td style={{ padding: '50px', border: '1px solid black' }}>{id + 1}</td>
        <td style={{ padding: '50px', border: '1px solid black' }}>{e.name}</td>
        <td style={{ padding: '50px', border: '1px solid black' }}>{e.email}</td>
        <td style={{ padding: '60px', border: '1px solid black' }}>{e.status}</td>
        <td style={{ padding: '60px', border: '1px solid black' }}>
          <button  onClick={() => { setFormData(e); }} className="btn btn-primary">{"Show more..."}</button>
        </td>
      </tr>
    })
  }

  const renderHeader = () => {
    return <tr>
      {columns.map(key => <th>{capitalize(key)}</th>)}
    </tr>
  }

  const renderTable = () => {
    return (
      <table>
        {renderHeader()}
        <tbody>
          {renderUsers()}
        </tbody>
      </table>
    )
  }

  return (
    <>
    {!showForm && <div style={{ margin: '50px' }}>
      <h1>Candidates Table</h1>
      {renderTable()}
    </div>}
    {
      showForm && <ApproveRejectForm data={preFillData}/>
    }
    </>
  );
}


export default ListOfAppliedCandidates