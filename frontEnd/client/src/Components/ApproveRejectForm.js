import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default function ApproveRejectForm(props) {

    const history = useHistory();

    useEffect(()=>{
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        if(!employee)
            history.push('login')
    })

    const handleApprove=async(e)=>{
        e.preventDefault();

        let payload = {
            //oldValue: {name: props.data.name, email: props.data.email, status: props.data.status},
            email: props.data.email, status: "Approved"
          }

       try{
           await axios.put(`http://localhost:9002/scandidate/${props.data.internshipId}`,payload);
            alert('Application Approved successfully');
            window.location.reload();
        }catch(error){
            alert('Error in Approving the application.');
        }
    };

    const handleReject=async(e)=>{
        e.preventDefault();

        let payload = {
            //oldValue: {name: props.data.name, email: props.data.email, status: props.data.status},
            email: props.data.email, status: "Rejected"
          }

       try{
           await axios.put(`http://localhost:9002/scandidate/${props.data.internshipId}`,payload);
            alert('Application Rejected successfully');
            window.location.reload();
        }catch(error){
            alert('Error in Rejecting the application.');
        }
    };

    return(
        <div  className="register" style={{marginLeft:'480px'}}>
            <form>
                Name<input disabled={true} type="text" className="form-control"  value={props.data.name} /> <br/>
                Email<input disabled={true} type="email" className="form-control"  value={props.data.email} /> <br/>
                Position<input disabled={true} type="text" className="form-control"  value={props.data.position} /> <br/>
                Experience<input disabled={true} type="text" className="form-control"  value={props.data.experience} /> <br/>
                Phone Number<input disabled={true} type="number" className="form-control" value={props.data.phoneNumber} /> <br/>
                Description<input disabled={true} type="text" className="form-control"  value={props.data.description} /> <br/>
                Skills<input disabled={true} type="text" className="form-control"  value={props.data.skills} /> <br />
                <button onClick={handleApprove} className="btn btn-primary">Approve</button> &nbsp; &nbsp;      
                <button  onClick={handleReject} className="btn btn-danger">Reject</button>     

            </form>
        </div>
    );
}
