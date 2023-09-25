import React, { useState, useEffect } from 'react';
import './style.css';
const lcoalData = () => {
  const list = JSON.parse(localStorage.getItem('items'));
  if (list) {
    return JSON.parse(localStorage.getItem('items'));
  } else {
    return [];
  }
};

export default function App() {
  const [items, setItems] = useState(lcoalData());
  const [inputData, setInputData] = useState('');
  const [inputDataId, setInputDataId] = useState('');
  const addItems = () => {
    const list = { id: new Date().getTime().toString(), name: inputData };
    if (inputDataId) {
      const updatedItems = items.findIndex((elem) => {
        return elem.id === inputDataId;
      });
      const itemsT = structuredClone(items);
      if (updatedItems !== -1) {
        itemsT[updatedItems].name = inputData;
      }
      setItems(itemsT);
      setInputData('');
      setInputDataId('');
    } else {
      setItems([...items, list]);
      setInputData('');
    }
  };
  const deleteItems = (id) => {
    const updatedItems = items.filter((elem) => {
      return elem.id !== id;
    });
    setItems(updatedItems);
  };
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  const editItems = (id) => {
    const updatedItems = items.filter((elem) => {
      return elem.id === id;
    });
    if (updatedItems.length > 0) {
      setInputData(updatedItems[0].name);
      setInputDataId(updatedItems[0].id);
    }
  };
  return (
    <div>
      <input
        placeholder="Add Items"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addItems();
          }
        }}
      ></input>
      <button onClick={addItems}>Add Data</button>
      {items.map((elem, ind) => {
        return (
          <div key={elem.id}>
            {ind} {elem.name}
            <button onClick={() => deleteItems(elem.id)}>Delete</button>
            <button onClick={() => editItems(elem.id)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}
