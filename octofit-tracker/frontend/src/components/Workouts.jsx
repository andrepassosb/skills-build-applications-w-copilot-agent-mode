import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts');
        if (isMounted) {
          setRecords(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Recommended sessions and training plans.</p>
        </div>
        <span className="badge bg-warning-subtle text-warning-emphasis">{records.length} workouts</span>
      </div>

      <div className="row g-3">
        {records.map((record, index) => (
          <div className="col-md-6" key={`${record.name || record.title || 'workout'}-${index}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 card-title">{record.name || record.title || `Workout ${index + 1}`}</h3>
                <p className="card-text text-muted">{record.description || record.notes || 'Workout details from the backend.'}</p>
                {record.duration && <p className="small mb-0">Duration: {record.duration}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
