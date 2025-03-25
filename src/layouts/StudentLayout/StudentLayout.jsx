import PropTypes from "prop-types";
import styles from "./studentLayout.module.css";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import StudentDetails from "../../components/StudentDetails/StudentDetails";
import Table from "../../components/Table/Table";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";

const StudentLayout = ({ profilePicture, studentDetails, tableData, barGraphData, lineGraphData }) => {
  return (
    <div className={styles.container}>
      {/* ✅ Left Section: Profile, Table & Rectangles */}
      <div className={styles.leftContainer}>
        {/* ✅ Profile & Student Details */}
        <div className={styles.topSection}>
          {profilePicture && <ProfilePicture {...profilePicture} />}
          {studentDetails && <StudentDetails {...studentDetails} />}
        </div>

        {/* ✅ Table Section */}
        {tableData?.columns?.length && tableData?.data?.length ? (
          <div className={styles.tableSection}>
            <Table columns={tableData.columns} data={tableData.data} />
          </div>
        ) : (
          <p className={styles.noData}>No table data available</p>
        )}

        {/* ✅ Rectangles below Table */}
        <div className={styles.rectangleContainer}>
          <Rectangle variant="one" />
          <Rectangle variant="two" />
        </div>
      </div>

      {/* ✅ Right Section: Graphs */}
      <div className={styles.graphContainer}>
        <div className={styles.graphSection}>
          <div className={styles.graphWrapper}>
            <div className={styles.graphHeading}>Performance Graph</div>
            <div className={styles.barGraph}>
              {barGraphData?.length ? <BarGraph data={barGraphData} /> : <p>No bar graph data</p>}
            </div>
          </div>

          <div className={styles.graphWrapper}>
            <div className={styles.graphHeading}>Time vs Score</div>
            <div className={styles.lineGraph}>
              {lineGraphData?.length ? (
                <LineGraph data={lineGraphData} lines={[{ dataKey: "marks", color: "#282A2B" }]} />
              ) : (
                <p>No line graph data</p>
              )}
            </div>
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
};

// ✅ **Default Props to Prevent Undefined Errors**
StudentLayout.defaultProps = {
  profilePicture: { imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
  studentDetails: { firstName: "John Doe", studentId: "12345", rank: "1" },
  tableData: { columns: [], data: [] },
  barGraphData: [],
  lineGraphData: [],
};

export default StudentLayout;
