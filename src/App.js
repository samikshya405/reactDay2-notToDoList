import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [taskList, settaskList] = useState([])
  const [newTask, setnewTask] = useState('')
  const [newHour, setnewHour] = useState('')
  const [totalHr, settotalHr] = useState(0)
  const [badHr, setbadHr] = useState(0)

  const [badTasklist, setbadTasklist] = useState([])

  //delete task from entrylist
  const deleteTask=(index)=>{
    const updatedList = [...taskList]
    updatedList.splice(index,1)
    settaskList(updatedList)

  }

  //add task to tasklist when clicking on add
  const handleAddTask=()=>{
    // if((totalHr + Number(newHour))>168){
    //   alert('hour exceeded')
    //   return
    // }
   const obj={task:newTask,hour:newHour}
   
    const updatedTaskList = [...taskList,obj]
    settaskList(updatedTaskList)
    setnewTask('')
    setnewHour('')
    

  }

  //delete task from bad task list
  const deleteBadTask=(index)=>{
    const updatedBadList=[...badTasklist]
    updatedBadList.splice(index,1)
    setbadTasklist(updatedBadList)

  }


  //switch to bad taskj
  const switchToBadTask=(index)=>{
    const updatedBadList=[...badTasklist, taskList[index]]
    setbadTasklist(updatedBadList)
    const updatedlist=[...taskList]
    updatedlist.splice(index,1)
    settaskList(updatedlist)
    
  }

  //switch to good task
  const switchToGoodTaskList=(index)=>{
    const updatedList=[...taskList,badTasklist[index]]
    settaskList(updatedList)
    const updatedBadList=[...badTasklist]
    updatedBadList.splice(index,1)
    setbadTasklist(updatedBadList)
  }

  //calculate total hour allocated and total hr you could saved
  const calculateTotalhr=()=>{
    const entryList=[...taskList]
    const badList = [...badTasklist]
    let totalUserHr=0
    let badUserHr=0
    entryList.forEach(item=>{
      totalUserHr+=Number(item.hour)
    })
    badList.forEach(item=>{
      badUserHr+=Number(item.hour)
    })
    setbadHr(badUserHr)
   
    const t=totalUserHr + badUserHr
    settotalHr(t)
    

  }

  //useEffect to call the function
  useEffect(()=>{
    calculateTotalhr()
  })


  return (
    <div className='container'>
      <h1 className='text-center'>Not to do list</h1>


      <form>
          <div className="row mt-3 g-2">
            <div className="col-md-6">
              <input
                type="text"
                name="task"
                className="form-control task-input"
                required
                placeholder="Enter a task..."
                value ={newTask}
                onChange={(e)=>setnewTask(e.target.value)}

              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="hr"
                className="form-control hrs-input"
                min="1"
                required
                placeholder="Enter no. of hrs"
                value={newHour}
                onChange={(e)=>setnewHour(e.target.value)}
              />
            </div>
            <div className="col-md-3 text-center">
              <button className="btn btn-primary" type="submit" id="form-btn" onClick={handleAddTask}>
                 Add New Task
              </button>
            </div>
          </div>
        </form>
    


    <div className="row mt-5 g-2">
          <div className="col-md">
            <h2 className="text-center">Entry List</h2>
            <hr />
            <table className="table table-striped table-hover">
              <tbody id="task-list">
              {
          taskList.map((item,index)=>{
             return <tr key={item+index}><td>{index+1}</td><td>{item.task}</td><td>{item.hour}</td><td className='text-end'><button className='btn btn-danger' onClick={()=>deleteTask(index)}>delete</button> <button className='btn btn-success' onClick={()=>switchToBadTask(index)}>move-right</button></td></tr>
          })
        }
              </tbody>
            </table>
          </div>
          <div className="col-md">
            <h2 className="text-center">Bad List</h2>
            <hr />
            <table className="table table-striped table-hover">
              <tbody id="bad-task">
              {
                badTasklist.map((item,index)=>{
                  return <tr key={item}><td>{index+1}</td><td>{item.task}</td><td>{item.hour}</td><td className='text-end'><button className='btn btn-warning' onClick={()=>switchToGoodTaskList(index)}>move-left</button> <button className='btn btn-danger' onClick={()=>deleteBadTask(index)}>delete</button></td></tr>
               })
              }
              </tbody>
            </table>

            <div className="text-end fw-bold">
              You can save {badHr} Hours
            </div>
            
          </div>
          <div className="row fw-bold">
          <div className="col">
            The total hours allocated for this week is {totalHr} Hours
          </div>
        </div>
        </div>


    
    </div>
  )
}

export default App