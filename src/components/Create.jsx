import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Create() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState(0);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const addUser = {name,email,age};

    const response = await fetch("http://localhost:5000/",{
      method: 'POST',
      body: JSON.stringify(addUser),
      headers:{
        'content-Type': "application/json",
      },
    });

    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error)
    }

    if(response.ok){
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge(0);
      navigate("/read");
    }
  }

  return (
    <div classNameName='container my-2'>

      {error && <div class="alert alert-danger">{error}</div>}
      <h2 classNameName='text-center'>Enter the text</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Enter Name:</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Enter Age :</label>
          <input type="" value={age} onChange={(e)=>setAge(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>

        <button type="submit"  className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
