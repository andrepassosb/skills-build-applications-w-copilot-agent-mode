import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('leaderboard');
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

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Current standings and ranks.</p>
        </div>
        <span className="badge bg-success-subtle text-success-emphasis">{records.length} entries</span>
      </div>

      <div className="list-group">
        {records.map((record, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-start" key={`${record.rank ?? index}-${index}`}>
            <div>
              <div className="fw-semibold">{record.name || record.user || record.username || `Entry ${index + 1}`}</div>
              <div className="text-muted small">{record.team || record.description || 'Leaderboard entry'}</div>
            </div>
            <span className="badge bg-dark">#{record.rank ?? index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
