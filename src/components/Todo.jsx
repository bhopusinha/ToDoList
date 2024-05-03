import React, { useEffect, useState } from 'react'
import './Todo.css'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Todo = () => {

    const getLocal = () => {
        return JSON.parse(localStorage.getItem('list'));
    }

    const [inpu, setInpu] = useState('');
    const [addItem, setItem] = useState(getLocal() ||[]);
    const [toggle, settoggle] = useState(true);
    const [changeTodo,setChangeTodo]=useState(null);


    const inputChange = (event) => {
        setInpu(event.target.value);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(addItem));
    }, [addItem])

    const deleteItem = (id) => {
        setItem(() => {
            return addItem.filter((v, ind) => {
                return id !== ind;
            })
        })
    }

    const aditItem = (e) => {

        const data = addItem.find((v, ind) => {
            return e === v.id;
        })
       settoggle(false);
        setInpu(data.name);

        setChangeTodo(data.id);

    }

    const addContent = () => {
        let allinputData = { id: new Date().getTime().toString(), name: inpu };
        if(!inpu){
            alert('plz add data');
        }else if(inpu && !toggle){
            setItem(
                  addItem.map((v)=>{
                    if(changeTodo===v.id){
                        return {...v,name:inpu}; 
                    }  
                    return v; 
                })
            )
            settoggle(true);
        }else{
            setItem((oldItems) => {
                return [...oldItems, allinputData];
            })
        }
        setInpu('');
    };

    return (
        <>
            <div className="main">
                <h1 className='heading'>ToDo List</h1>
                <div className="inp">
                    <input type="text" placeholder='Enter a Item' value={inpu} onChange={inputChange} />
                    {toggle ? <AddCircleIcon onClick={addContent} style={{fontSize:"2.2rem"}} className='btn'/> :
                        <EditNoteIcon style={{fontSize:"2.2rem"}} className='btn' onClick={addContent} />
                    }
                </div>
                {
                   addItem? addItem.map((v,ind) => {
                            return (
                                <ul>
                                    <h4>{v.name}</h4>
                                    <div className="icon">
                                        <EditNoteIcon className='ic' key={v.id} id={v.id} onClick={() => { aditItem(v.id) }} />
                                        <DeleteIcon className='ic' key={v.id} id={v.id} onClick={() => { deleteItem(ind)}} />
                                    </div>
                                </ul>
                            )
                    }) : []
                }
            </div>
        </>
    )
}

export default Todo
