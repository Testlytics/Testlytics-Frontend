import PropTypes from "prop-types";
import styles from "./studentLayout.module.css";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import StudentDetails from "../../components/StudentDetails/StudentDetails";
import Table from "../../components/Table/Table";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";

const StudentLayout = ({ 
  firstName = "Unknown",
  studentId = "0",
  rank = "N/A",
  email = "No Email",
  image = "",
  tableData,
  barGraphData = [],
  lineGraphData = [],
}) => {
  
  // Safely handle all data with proper fallbacks
  const safeTableData = {
    columns: Array.isArray(tableData?.columns) ? tableData.columns : [],
    data: Array.isArray(tableData?.data) ? tableData.data : []
  };

  const safeBarGraphData = Array.isArray(barGraphData) ? barGraphData : [];
  const safeLineGraphData = Array.isArray(lineGraphData) ? lineGraphData : [];

  const imageUrl = image
    ? `data:image/png;base64,${image}` 
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className={styles.layout}>
      <div className={styles.profileStatsContainer}>
        <ProfilePicture src={imageUrl} />
        <StudentDetails id={studentId} firstName={firstName} email={email} rank={rank} />

        <div className={styles.rectangles}>
          <Rectangle leftText="Attendance" />
          <Rectangle leftText="Accuracy" />
        </div>

        <div className={styles.graphContainer}>
          <div className={styles.graphTitle}>Performance Graph</div>
          <div className={styles.graph}>
            {safeBarGraphData.length ? <BarGraph data={safeBarGraphData} /> : <p>No bar graph data</p>}
          </div>
        </div>
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.tableWrapper}>
          {safeTableData.columns.length > 0 && safeTableData.data.length > 0 ? (
            <Table 
              columns={safeTableData.columns} 
              data={safeTableData.data} 
            />
          ) : (
            <p>No test score data available</p>
          )}
        </div>

        <div className={styles.graphContainer}>
          <div className={styles.graphTitle}>Time vs Score</div>
          <div className={styles.graph}>
            {safeLineGraphData.length ? (
              <LineGraph data={safeLineGraphData} lines={[{ dataKey: "marks", color: "#282A2B" }]} />
            ) : (
              <p>No line graph data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

StudentLayout.propTypes = {
  firstName: PropTypes.string,
  studentId: PropTypes.string,
  rank: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  tableData: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object)
  }),
  barGraphData: PropTypes.array,
  lineGraphData: PropTypes.array,
};

export default StudentLayout;