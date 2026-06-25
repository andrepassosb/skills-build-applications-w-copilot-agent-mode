import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return '—';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

function Activities() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities');
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

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent movement and training activity entries.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary-emphasis">{records.length} items</span>
      </div>

      <div className="row g-3">
        {records.map((record, index) => {
          const title = record.name || record.title || record.type || record.activityType || `Activity ${index + 1}`;

          return (
            <div className="col-md-6" key={`${title}-${index}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 card-title">{title}</h3>
                  <p className="card-text text-muted">
                    {record.description || record.notes || record.summary || 'Activity record from the backend.'}
                  </p>
                  <ul className="list-unstyled small mb-0">
                    {Object.entries(record)
                      .filter(([key]) => !['description', 'notes', 'summary'].includes(key))
                      .slice(0, 5)
                      .map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {formatValue(value)}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Activities;
