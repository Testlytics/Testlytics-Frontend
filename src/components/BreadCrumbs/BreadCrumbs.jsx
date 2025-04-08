// components/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import "./breadCrumbs.module.css";


const routeNameMap = {
  'login': 'Login',
  'change-password': 'Change Password',
  'studentlist': 'Students',
  'overview': 'Dashboard',
  'exam': 'Exam Overview',
  'exams': 'All Exams',
  'subjects': 'Subjects',
  'add-question': 'Add Question',
  'questions': 'Questions',
  'manage-users': 'Manage Users',
  'reports': 'Reports',
  'student-report': 'Student Result',
  'question-paper': 'Question Paper',
  'missed-upcoming': 'Missed & Upcoming',
};

const Breadcrumbs = () => {
  const location = useLocation();

  const crumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments.map((segment, idx) => {
      const path = '/' + pathSegments.slice(0, idx + 1).join('/');
      return {
        label: routeNameMap[segment] || segment,
        path,
      };
    });
  }, [location]);

  if (crumbs.length === 0) return null;

  return (
    <nav className="p-4 text-sm text-gray-600">
      <Link to="/" className="hover:underline text-[#5A643C] font-semibold">Home</Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.path}>
          {' / '}
          {idx === crumbs.length - 1 ? (
            <span className="text-black">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:underline text-[#5A643C]">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
