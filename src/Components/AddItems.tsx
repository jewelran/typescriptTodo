import MapsLocalActivity from 'material-ui/svg-icons/maps/local-activity';
import React, { useCallback, useReducer, useRef } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
const AddItems = () => {
    interface item {
        text: string,
        id:number,
    }
    
 type ActionType  = {type: "ADD_ITEM";text: string} | {type: "REMOVE", id:number}
 function  reducer (state:item[], action:ActionType) {
     switch (action.type){
         case "ADD_ITEM": 
         return [
             ...state,
             {
                 id: state.length + 1,
                 text: action.text
             }
         ];
         case "REMOVE" :
             return state.filter(({id}) => id !== action.id)
         
     }

 }

 const [items, dispatch]  = useReducer(reducer , [])
 console.log(items);

const localStorageItems = localStorage.setItem("items", JSON.stringify(`${""}`))
  console.log(localStorageItems);
  
 const addItemsRef = useRef<HTMLInputElement>(null)
const AddItemsHandler = useCallback (() => {
        if (addItemsRef.current) {
            dispatch({
                type:"ADD_ITEM",
                text: addItemsRef.current.value,
            })
            addItemsRef.current.value = ""
        }
},[])


const itemsContainer = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      fontSize:20,
      display:"flex",
      minWidth:300,
      margin:20,
      justifyContent:"space-between"
    },
  });
  const inputArea = makeStyles({
      style:{
          display:"flex",
      }
  })
  const inputContainer = makeStyles ({
      container : {
            display:"flex",
            justifyContent:"center",
            background:"orange",
            height: 50
      }
  })
  const inptu = makeStyles ({
      
  })
  const inputMainContainer = inputContainer()
  const inputWrap = inputArea()
  const classes = itemsContainer();
  return (
    <div>
            <h1>this is added items</h1>

            <div className="">
                      <div className = {inputMainContainer.container}>
                      <div className={inputWrap.style}>
                       <input ref={addItemsRef} type="text" name="" id="" />
                        <Stack direction="row" spacing={3}>
                        <Button onClick={AddItemsHandler} variant="contained">ADD ITEMS</Button>
                        </Stack>
                       </div>
                      </div>

                {
                    items.map((item) =><div style={{display:"flex",alignItems:"center",justifyContent:"center"}} key={item.id}>
                    
                        <div style={{padding:"10px"}} className={classes.root}>
                        <div >
                        <p>{item.text}</p>
                        </div>
                        <Stack direction="row" spacing={3}>
                        <Button onClick={() => dispatch({type:"REMOVE", id:item.id})} variant="contained">DELETE</Button>
      
                        </Stack>
                        </div>
                        
                    </div>)
                }
            </div>
    </div>
  )
}

export default AddItems