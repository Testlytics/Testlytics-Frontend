import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react'; // ✅ Import arrow icon
import styles from "./breadCrumbs.module.css";

const routeNameMap = {
  'overview': 'Dashboard',
  'login': 'Login',
  'change-password': 'Change Password',
  'studentlist': 'Students',
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
        label: routeNameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path,
      };
    });
  }, [location]);

  if (crumbs.length === 0) return null;

  return (
    <nav className={styles.breadcrumbsNav}>
      <Link to="/overview" className={styles.dashboardLink}>
        Dashboard
      </Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.path} className={styles.crumb}>
          <ChevronRight size={24} className={styles.arrowIcon} />
          {idx === crumbs.length - 1 ? (
            <span className={styles.active}>{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className={styles.link}>
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
