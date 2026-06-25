import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const data = await fetchCollection('teams');
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

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Collaborative groups and team details.</p>
        </div>
        <span className="badge bg-info-subtle text-info-emphasis">{records.length} teams</span>
      </div>

      <div className="row g-3">
        {records.map((record, index) => (
          <div className="col-md-6" key={`${record.name || record.teamName || 'team'}-${index}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 card-title">{record.name || record.teamName || `Team ${index + 1}`}</h3>
                <p className="card-text text-muted">{record.description || record.motto || 'Team details from the backend.'}</p>
                {record.members && <p className="small mb-0">Members: {record.members.length}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
