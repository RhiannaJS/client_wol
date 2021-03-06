import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState("");
    const [definition, setDefinition] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/log/", {
            method: "POST",
            body: JSON.stringify({log: {description: description, definition: definition, results: result}}),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${props.token}`
            })
        }) .then ((res) => res.json())
        .then((logData) =>{
            console.log(logData);
            setDescription("");
            setDefinition("");
            setResult("");
            props.fetchWorkouts();
        })
    }

    useEffect(() =>{
        props.fetchWorkouts()
    }, [])

    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description" >Description</Label>
                    <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition">Definition</Label>
                    <Input name="definition" value={definition} type="select" onChange={(e)=> setDefinition(e.target.value)}>     
                    <option value="Time">Time</option>
                    <option value="Weight">Weight</option>
                    <option value="Distance">Distance</option>    
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result">Result</Label>
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}/>
                </FormGroup>
                <Button type="Submit">Click to Submit</Button>
                {/* <Form onSubmit={handleSubmit}/> */}
            </Form>
        </>
    )
}

export default WorkoutCreate;