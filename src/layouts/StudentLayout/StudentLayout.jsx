import PropTypes from "prop-types";
import styles from "./studentLayout.module.css";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import StudentDetails from "../../components/StudentDetails/StudentDetails";
import Table from "../../components/Table/Table";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";

const StudentLayout = ({ 
  profilePicture, 
  studentDetails, 
  tableData, 
  barGraphData, 
  lineGraphData,
  rectangleOneText, 
  rectangleTwoText 
}) => {
  return (
    <div className={styles.layout}>
      {/* ✅ Profile, Rectangles & Performance Graph (Grouped in One Container) */}
      <div className={styles.profileStatsContainer}>
        {/* ✅ Profile & Student Details */}
        
          {profilePicture && <ProfilePicture {...profilePicture} />}
          {studentDetails && <StudentDetails {...studentDetails} />}

        {/* ✅ Rectangles & Performance Graph */}
          <div className={styles.rectangles}>
            <Rectangle leftText={rectangleOneText.left} rightText={rectangleOneText.right} />
            <Rectangle leftText={rectangleTwoText.left} rightText={rectangleTwoText.right} />
          </div>
          <div className={styles.graphContainer}>
            <div className={styles.graphTitle}>Performance Graph</div>
            <div className={styles.graph}>
              {barGraphData?.length ? <BarGraph data={barGraphData} /> : <p>No bar graph data</p>}
            </div>
          </div>
      </div>

      {/* ✅ Table & Line Graph in One Container */}
      <div className={styles.dataContainer}>
        {/* ✅ Table Section */}
        {tableData?.columns?.length && tableData?.data?.length ? (
          <div className={styles.tableWrapper}>
            <Table columns={tableData.columns} data={tableData.data} />
          </div>
        ) : (
          <p className={styles.noData}>No table data available</p>
        )}

        {/* ✅ Line Graph Section */}
        <div className={styles.graphContainer}>
          <div className={styles.graphTitle}>Time vs Score</div>
          <div className={styles.graph}>
            {lineGraphData?.length ? (
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
// ✅ **Prop Validation**
StudentLayout.propTypes = {
  profilePicture: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
  }),
  studentDetails: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
  }),
  tableData: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  barGraphData: PropTypes.array,
  lineGraphData: PropTypes.array,
  rectangleOneText: PropTypes.shape({
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
  }),
  rectangleTwoText: PropTypes.shape({
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
  }),
};

// ✅ **Default Props to Prevent Undefined Errors**
StudentLayout.defaultProps = {
  profilePicture: { imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  studentDetails: { firstName: "John Doe", studentId: "12345", rank: "1" },
  tableData: { columns: [], data: [] },
  barGraphData: [],
  lineGraphData: [],
  rectangleOneText: { left: "Performance", right: "85%" },
  rectangleTwoText: { left: "Improvements", right: "+5%" },
};
export default StudentLayout;
