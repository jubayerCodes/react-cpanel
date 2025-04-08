import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [postTitle, setPostTitle] = useState("")
  const [postDesc, setPostDesc] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSubmit = async () => {
    const formData = new FormData();
  
    formData.append("title", postTitle);
    formData.append("body", postDesc);
    formData.append("postImg", selectedFile);
  
    const res = await fetch("http://localhost:3000/api/v1/post", {
      method: "POST",
      body: formData, // Do NOT set Content-Type manually
    });
  
    const result = await res.json();
  
    if (result?.status === "success") {
      setPostTitle("");
      setPostDesc("");
      setSelectedFile(null);
      alert("Post added successfully");
    } else {
      alert("Something went wrong.");
    }
  };

    return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Button variant="primary" onClick={handleShow}>
              Add Post
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Post Title"
                      autoFocus
                      onChange={(e)=> setPostTitle(e.target.value)}
                      value={postTitle}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='Post Description'                       onChange={(e) => setPostDesc(e.target.value)} value={postDesc} />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Post Image</Form.Label>
                    <Form.Control type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Post
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        </Container>
      </Navbar>
    );
};

export default Header;