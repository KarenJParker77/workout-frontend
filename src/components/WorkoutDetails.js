import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date fns import to handle how we present the date
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://workout-backend-csbx.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
