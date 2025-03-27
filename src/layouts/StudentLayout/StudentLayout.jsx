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
  image = "", // This prop contains the Base64 image
  tableData = [],
  barGraphData = [],
  lineGraphData = [],
}) => {
  
  // Ensure image is in the correct format
  const imageUrl = image
    ? `data:image/png;base64,${image}` 
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className={styles.layout}>
      <div className={styles.profileStatsContainer}>
        {/* Pass the formatted image URL */}
        <ProfilePicture src={imageUrl} />
        <StudentDetails id={studentId} firstName={firstName} email={email} rank={rank} />

        <div className={styles.rectangles}>
          <Rectangle leftText="Attendance" />
          <Rectangle leftText="Accuracy" />
        </div>

        <div className={styles.graphContainer}>
          <div className={styles.graphTitle}>Performance Graph</div>
          <div className={styles.graph}>
            {barGraphData.length ? <BarGraph data={barGraphData} /> : <p>No bar graph data</p>}
          </div>
        </div>
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.tableWrapper}>
          {tableData.length ? <Table columns={tableData.columns} data={tableData.data} /> : <p>No table data</p>}
        </div>

        <div className={styles.graphContainer}>
          <div className={styles.graphTitle}>Time vs Score</div>
          <div className={styles.graph}>
            {lineGraphData.length ? (
              <LineGraph data={lineGraphData} lines={[{ dataKey: "marks", color: "#282A2B" }]} />
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
  image: PropTypes.string, // Ensure this is a string (Base64)
  tableData: PropTypes.array,
  barGraphData: PropTypes.array,
  lineGraphData: PropTypes.array,
};

export default StudentLayout;
