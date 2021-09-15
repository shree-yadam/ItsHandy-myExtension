import axios from "axios";
import RequestItemInfo from "./RequestItemInfo";
import Button from 'react-bootstrap/Button';
import './AssignedJobList.scss';
import { useHistory } from "react-router-dom";

export default function AssignedJobListItem({
  currentUser,
  id,
  job,
  category,
  markJobCompleted
}) {

  console.log(job);
  // Browser History
  const history = useHistory();

  function handleMarkCompleted(){
   console.log("Marking Completed");
   const date = Date.now();
    axios.put(`api/providers/${currentUser.id}/assignedJobs/${id}/update`, {date})
    .then((res) => {
      //set assigned jobs to new list
      markJobCompleted(id);
    })
    .catch((err) => console.log("Error: ", err));

  }

  function handleMessage(){
    history.push(`/messages/${id}/to/${job.client_id}`);
  }

  return (
    <div className= "assigned-jobs" id="assigned-jobs-hov">
      <RequestItemInfo
        title={job.title}
        description={job.description}
        category={category}
        date={job.preferred_date}
        street_address={job.street_address}
        city={job.city}
      />
      <Button onClick={handleMessage}>Messages</Button>
      {/* <Button onClick={handleMarkCompleted}>Mark Completed</Button> */}
    </div>
  )
}