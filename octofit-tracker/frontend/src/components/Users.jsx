import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const data = await fetchCollection('users');
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

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Profile and account data returned by the API.</p>
        </div>
        <span className="badge bg-secondary-subtle text-secondary-emphasis">{records.length} users</span>
      </div>

      <div className="row g-3">
        {records.map((record, index) => (
          <div className="col-md-6" key={`${record.username || record.email || 'user'}-${index}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h6 card-title">{record.username || record.name || record.email || `User ${index + 1}`}</h3>
                <p className="card-text text-muted">{record.email || record.bio || 'User profile details.'}</p>
                {record.team && <p className="small mb-0">Team: {record.team}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
