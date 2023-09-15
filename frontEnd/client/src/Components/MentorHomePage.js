import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ListOfAppliedCandidates from './ListOfAppliedCandidates';
import { useSelector } from 'react-redux';


export default function MentorHomePage(props) {
    const history = useHistory()


    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [modalData, setModalData] = useState([])
    const [listData, setListData] = useState([])

    const [data, setData] = useState([]);

    const handleClose = () => setShow(false);

    const {searchText} = useSelector(e=>e.UserReducer)

    useEffect(() => {
        let u = localStorage.getItem('user');
        setCurrentUser(JSON.parse(u));
      }, []);
    

    useEffect(() => {
        let u = localStorage.getItem('user');
        let employee = JSON.parse(u)
        if (!employee)
            history.push('login')
    })

    const loadData = async () => {
        const response = await axios.get(
            "http://localhost:9002/getinternship");
        setData(response.data.data);
    }

    useEffect(() => {
        loadData();
    }, []);


    function handleShow(mData) {
        setModalData(mData)
        setShow(true);

    }

    function handleShowList(lData) {
        setListData(lData)
        setShowList(true)
    }


    async function deleteInternship(iData) {
        try{
            await axios.delete(`http://localhost:9002/deleteinternship/${iData._id}`);
             alert('Internship Deleted successfully');
             window.location.reload();
         }catch(error){
         }
    }

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


            {!showList && <div className="container text-center">
                <div className="row" style={{ marginTop: "66px" }}>
                    <h4>List of Avaialable Internships</h4>

                    {
                        data?.filter(q=>q.title?.toLowerCase()?.includes(searchText?.toLowerCase()))?.map(e => {
                            return (
                                <div className="col" style={{ backgroundColor: 'ghostwhite', paddingTop: '20px' }}>
                                    <div className="card" style={{ width: '18rem', marginBottom: '34px' }}>
                                        <img src={e.image} className="card-img-top" alt="skill required" style={{ height: "103px" }} />
                                        <div className="card-body">
                                            <p className="card-text"><b>Profile</b> {e.title}</p>
                                            {/* <p className="card-text"><b>Applied By</b> {e.appliedBy}</p> */}
                                            <p className="card-text"><b>Skills Required</b>: {e.skills}</p>
                                            <p className="card-text"><b>Duration</b>: {e.duration}</p>
                                            <p className="card-text"><b>Location</b>: {e.location}</p>
                                            <p className="card-text"><b>Total Applied By</b>: {e.applied.length}</p>

                                            <a href="#" className="btn btn-primary" onClick={() => { handleShow(e); }}>More Details...</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>}



            {!showList && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Intenship Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="card-text"><b>Profile</b> {modalData.title}</p>
                    <p className="card-text"><b>Mentor Name</b> {modalData.mentorName}</p>
                    <p className="card-text"><b>Skills Required</b>: {modalData.skills}</p>
                    <p className="card-text"><b>Duration</b>: {modalData.duration}</p>
                    <p className="card-text"><b>Location</b>: {modalData.location}</p>
                    <p className="card-text"><b>Descriptions</b>: {modalData.descriptions}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={!(modalData.mentorName===currentUser.name)} onClick={() => { handleShowList(modalData); }} >
                        List of Candidates
                    </Button>
                    <Button variant="primary" disabled={!(modalData.mentorName===currentUser.name)} onClick={() => { deleteInternship(modalData); }}>
                        Delete Intenship
                    </Button>
                </Modal.Footer>
            </Modal>}

            {showList && <ListOfAppliedCandidates data={listData} />}
        </div>
    )
}

//name email status form(accept,reject,) more...
//pending, accept, reject