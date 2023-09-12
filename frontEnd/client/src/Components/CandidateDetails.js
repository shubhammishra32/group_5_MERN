import React, { useState } from 'react';
import axios from 'axios';

function CandidateDetails(props){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        experience: '',
        phoneNumber: 0,
        description: '',
        skills: '',
    })

    console.log("111",formData,props,{...formData,internshipId: props.data.id})
    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
           await axios.post('http://localhost:9002/applyform',
           {...formData,internshipId: props.data._id});
            alert('Application submitted successfully');
            window.location.reload();
        }catch(error){
            alert('Error in submitting the application.');
        }
    };
    return(
        <div className="register" style={{marginLeft:'480px'}}>
            {console.log("ppp",props)}
            <form onSubmit={handleSubmit}>
                Name: <input type="text" className="form-control" placeholder='Name' value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/> <br/>
                Email: <input type="email" className="form-control" placeholder='Email' value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/> <br/>
                Position: <input type="text" className="form-control" placeholder='Position' value={formData.position} onChange={e=>setFormData({...formData,position:e.target.value})}/> <br/>
                Experience: <input type="text" className="form-control" placeholder='Experience' value={formData.experience} onChange={e=>setFormData({...formData,experience:e.target.value})}/> <br/>
                Phone Number: <input type="number" className="form-control" placeholder='Phone Number' value={formData.phoneNumber} onChange={e=>setFormData({...formData,phoneNumber:e.target.value})}/> <br/>
                Description: <input type="text" className="form-control" placeholder='Add a brief description about yourself..' value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})}/> <br/>
                Skills: <input type="text" className="form-control" placeholder='Skills' value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} /> <br />
                <button className="btn btn-primary">Apply</button>            
            </form>
        </div>
    );
}

export default CandidateDetails;
