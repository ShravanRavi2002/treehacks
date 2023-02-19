import Head from "next/head";
import { useState } from "react";
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css'
import Latex from 'react-latex-next'


export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [coursework, setCoursework] = useState('');
  const [gpa, setGPA]= useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [projects, setProjects] = useState('');
  const [additional, setAdditional] = useState('');
  const [result, setResult] = useState();
  

  function formatResults(latex) {
    // let generator = new HtmlGenerator({ hyphenate: false })
    // let doc = parse(latex, { generator: generator }).htmlDocument()
    console.log(latex)
    if (latex != undefined) {
      var info = latex.split('\n').map(str => <p>{str}</p>);
      // return <Latex>{'\n\n\\documentclass[letterpaper, 10 pt, conference]{i…\\normalsize \\textbf{} \\\\\n\n\\vspace{0.3cm}\n\n\\textit'}</Latex>
      return  (
      <Card style={{ width: '400px' }}>
        
        <Card.Body>
          <Card.Title>Resume Latex</Card.Title>
          {info}
        </Card.Body>
      </Card> 
      )
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, email: email, linkedin: linkedin, github: github, university: university, degree: degree, coursework: coursework, gpa: gpa, skills: skills, experience: experience, projects: projects, additional: additional}),
      });

      const data = await response.json();
      console.log(data)
      console.log(typeof(data.result))
      // console.log()
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResult(data.result);
      setName("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div style={{backgroundColor : '#F7EBF5'}}>
      <Head>
        <title>Resume Builder</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Container>
      <Row> 
      <Col>
      <Card style={{ width: '400px' }}>
      <Card.Body>
        <Card.Title>Resume Builder</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formField1">
            <Form.Label>NAME</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField2">
            <Form.Label>EMAIL</Form.Label>
            <Form.Control type="text" placeholder="Enter field 2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField3">
            <Form.Label>LINKEDIN</Form.Label>
            <Form.Control type="text" placeholder="Enter field 3" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>GITHUB</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={github} onChange={(e) => setGithub(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>UNIVERSITY</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={university} onChange={(e) => setUniversity(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField2">
            <Form.Label>DEGREE</Form.Label>
            <Form.Control type="text" placeholder="Enter field 2" value={degree} onChange={(e) => setDegree(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField3">
            <Form.Label>COURSEWORK</Form.Label>
            <Form.Control type="text" placeholder="Enter field 3" value={coursework} onChange={(e) => setCoursework(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>GPA</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={gpa} onChange={(e) => setGPA(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>SKILLS</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>PROJECTS</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={projects} onChange={(e) => setProjects(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>EXPERIENCE</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={experience} onChange={(e) => setExperience(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formField4">
            <Form.Label>ADDITIONAL INFO</Form.Label>
            <Form.Control type="text" placeholder="Enter field 4" value={additional} onChange={(e) => setAdditional(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card> 
    </Col>
    <Col>
    {formatResults(result)}
    </Col>
    </Row>
    </Container>
    </div>
  );
}
// document.body.style.backgroundColor = "#F7EBF5";