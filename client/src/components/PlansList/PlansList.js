import React from 'react'
import PlansItem from './PlansListItem'
import { useState, useEffect } from 'react'
import { deletePlanItem, fetchPlans, addPlan, completePlanItem  } from '../../http/dashboardAPI'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
const PlansList = () => {

  const [plans, setPlans] = useState([])
  const [value, setValue] = useState('')
  const [active, setActive] = useState(false);
  
  const create = () => {
    addPlan({title: value}).then(plan => {
      setValue('')
      setPlans([...plans, plan])
      setActive(false)
    })
  }
  
  const deletePlan = (planId) => {
    deletePlanItem(planId)
    const updatedPlans = plans.filter((plan) => plan.id !== planId);
    setPlans(updatedPlans);
    if (updatedPlans.length === 0) {
      fetchPlans().then((data) => setPlans(data));
    }
  }
  
  const update = (planId) => {
    setPlans(plans => plans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          completed: !plan.completed
        }
      }
      return plan
    }))
    completePlanItem(planId)
  }
  
  const handleClose = () => {
    setValue('')
  }
  
  useEffect(() => {
    try {
      fetchPlans().then((data) => setPlans(data));
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  

  
  return (
    <div>
    {plans.length === 0 ? (
      <p>Список планов пуст.</p>
    ) : (
      plans.slice().reverse().map((plan) => {
        return (
          <PlansItem
            key={plan.id}
            id={plan.id}
            status={plan.completed}
            name={plan.title}
            onChange={() => update(plan.id)}
            onClick={() => deletePlan(plan.id)}
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
            <h3>Введите наименование плана</h3>
            <input type='text' value={value} onChange={e => setValue(e.target.value)} />
            <Button onClick={() => create()}>Добавить</Button>
          </div>
        </Modal>
    </div>
  )
}

export default PlansList