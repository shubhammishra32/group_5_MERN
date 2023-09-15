import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import CandidateDetails from './CandidateDetails';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router';
import { useSelector } from 'react-redux';


export default function AppliedInternships() {

    const history = useHistory();

    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([])
    const [internData, setInternData] = useState([])
    const [modalData, setModalData] = useState('');
    const [appliedI, setAppliedI] = useState([]);
   
    const {searchText} = useSelector(e=>e.UserReducer)
    

    const loadData = async () => {
        const response = await axios.get(
            "http://localhost:9002/getinternship");
        setData(response.data.data);
    }

    useEffect(() => {
        loadData();
    }, []);

  

    useEffect(()=>{
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        if(!employee)
            history.push('login')
    })

    useEffect(() => {
        let arr = [];
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        let newData = data?.map(e1 => {
            if (e1.applied.filter(e2 => e2?.email === employee?.email).length) {
                arr.push(e1)
                return { ...e1, disabled: true }
            }
            else {
                return { ...e1, disabled: false }
            }
        })
        setAppliedI(arr);
        setInternData(newData)
    }, [data]);


    const handleClose = () => {
        setShow(false);
    }

    const handleApply = () => {
        setShow(false);
        setShowForm(true);
    }

    function handleShow(mData) {
        setModalData(mData)
        setShow(true);
    }

    // const data = [
    //     {
    //         id: "p1",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Pune, IN',
    //         appliedCandidate: [{ name: "shubham", email: "abc@gmail.com" },
    //         { name: "mishra", email: "abuyc@gmail.com" },
    //         { name: "shubsatyamham", email: "ahnbc@gmail.com" },],
    //     }, {
    //         id: "p1",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Pune, IN'
    //     },
    //     {
    //         id: "p1",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/csharp/images/c-sharp.png',
    //         duration: '2 months',
    //         location: 'Bangalore, IN'

    //     }, {
    //         id: "p1",
    //         skills: 'MongoDb, express, React, Node Js',
    //         title: 'MERN stack developer',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months',
    //         location: 'Noida, IN'
    //     }, {
    //         id: "p1",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN4',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2months'
    //     }, {
    //         id: "p1",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN5',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     }, {
    //         id: "p1",
    //         name: 'Pradumn Kumar',
    //         title: 'MERN6',
    //         description: 'Interested in this MERN internship oppourtunity.',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     },
    //     {
    //         id: "p2",
    //         name: 'Pavan Kumar',
    //         title: 'JAVA',
    //         description: 'Interested in this Java internship oppourtunity..',
    //         imageUrl: 'https://static.javatpoint.com/blog/images/mern-stack.png',
    //         duration: '2 months'
    //     },
    //     {
    //         id: "p3",
    //         name: 'Shashank',
    //         title: 'C#',
    //         description: 'Interested in this C# internship oppourtunity..',
    //         imageUrl: 'https://static.javatpoint.com/csharp/images/c-sharp.png',
    //         duration: '2 months'
    //     },

    // ]

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>



            {true && <div className="container text-center">
                <div className="row" style={{ marginTop: "66px" }}>
                    <h4>List of Applied Internships</h4>
                    {
                        appliedI?.filter(q=>q.title?.toLowerCase()?.includes(searchText?.toLowerCase()))?.map(e => {
                            return (
                                <div className="col" style={{ backgroundColor: 'ghostwhite', paddingTop: '20px' }}>
                                    <div className="card" style={{ width: '18rem', marginBottom: '34px' }}>
                                        <img src={e.image} className="card-img-top" alt="skill required" style={{ height: "103px" }} />
                                        <div className="card-body">
                                            <p className="card-text"><b>Profile</b> {e.title}</p>
                                            <p className="card-text"><b>Skills Required</b>: {e.skills}</p>
                                            <p className="card-text"><b>Duration</b>: {e.duration}</p>
                                            <p className="card-text"><b>Location</b>: {e.location}</p>
                                            <p className="card-text"><b>Mentor Name</b>: {e.mentorName}</p>
                                            <a href="#" className="btn btn-primary" onClick={() => { handleShow(e); }}>More Details...</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>}


            {!showForm && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Intenship Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="card-text"><b>Profile</b> {modalData.title}</p>
                    <p className="card-text"><b>Skills Required</b>: {modalData.skills}</p>
                    <p className="card-text"><b>Duration</b>: {modalData.duration}</p>
                    <p className="card-text"><b>Location</b>: {modalData.location}</p>
                    <p className="card-text"><b>Descriptions</b>: {modalData.descriptions}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        modalData.disabled && <Button variant="primary" disabled={true} style={{backgroundColor:'grey'}}>
                           Applied
                        </Button>
                    }
                   
                </Modal.Footer>
            </Modal>}

            {
                showForm && <CandidateDetails data={modalData} />
            }
        </div>
    )
}
