import React from 'react'
import TargetsListItem from './TargetsListItem'
import { useState, useEffect } from 'react'
import { addTarget, deleteTargetItem, fetchTargets, completeTargetItem } from '../../http/dashboardAPI'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
const TargetsList = () => {

  const [targets, setTargets] = useState([])
  const [value, setValue] = useState('')
  const [active, setActive] = useState(false);
  
  const create = () => {
    addTarget({title: value}).then(target => {
      setValue('')
      setTargets([...targets, target])
      setActive(false)
    })
  }
  
  const deleteTarget = (targetId) => {
    deleteTargetItem(targetId)
    const updatedTargets = targets.filter((targets) => targets.id !== targetId);
    setTargets(updatedTargets);
    if (updatedTargets.length === 0) {
      fetchTargets().then((data) => setTargets(data));
    }
  }
  
  const handleClose = () => {
    setValue('')
  }
  
  const update = (targetId) => {
    setTargets(targets => targets.map(target => {
      if (target.id === targetId) {
        return {
          ...target,
          completed: !target.completed
        }
      }
      return target
    }))
    completeTargetItem(targetId)
  }
  
  useEffect(() => {
    try {
      fetchTargets().then((data) => setTargets(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  
  return (
    <div>
    {targets.length === 0 ? (
      <p>Список целей пуст.</p>
    ) : (
      targets.slice().reverse().map((target) => {
        return (
          <TargetsListItem
            key={target.id}
            id={target.id}
            status={target.completed}
            name={target.title}
            onChange={() => update(target.id)}
            onClick={() => deleteTarget(target.id)}
          />
        );
      })
    )}
                <Button
        style={{ margin: "0 auto", marginTop: "50px"}}
        onClick={() => setActive(true)}
      >Добавить
      </Button>
        <Modal active={active} setActive={setActive} onClose={handleClose}>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "20px"}}>
            <h3>Введите цель</h3>
            <input type='text' value={value} onChange={e => setValue(e.target.value)} />
            <Button onClick={() => create()}>Добавить</Button>
          </div>
        </Modal>
    </div>
  )
}

export default TargetsList