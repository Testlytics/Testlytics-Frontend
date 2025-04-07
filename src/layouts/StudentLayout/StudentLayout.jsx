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
  attendance = { attended: 0, total: 0 },
  accuracy = 0,
}) => {
  const safeTableData = {
    columns: Array.isArray(tableData?.columns) ? tableData.columns : [],
    data: Array.isArray(tableData?.data) ? tableData.data : [],
  };

  const attendancePercentage =
    attendance.total > 0
      ? Math.round((attendance.attended / attendance.total) * 100)
      : 0;

  const imageUrl = image
    ? `data:image/png;base64,${image}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className={`container-fluid ${styles.layout}`}>
      {/* 🚀 Row 1 */}
      <div className="row align-items-start my-4 gy-4">
        {/* Profile Picture */}
        <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
          <ProfilePicture src={imageUrl} />
        </div>

        {/* Student Details */}
        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <StudentDetails
            id={studentId}
            firstName={firstName}
            email={email}
            rank={rank}
          />
        </div>

        {/* Rectangles */}
        <div className="col-12 col-md-2 d-flex flex-column gap-3 align-items-center justify-content-center">
          <Rectangle
            leftText="Attendance"
            rightText={`${attendancePercentage}%`}
            subText={`${attendance.attended}/${attendance.total} tests`}
          />
          <Rectangle leftText="Accuracy" rightText={`${accuracy}%`} />
        </div>

        {/* Bar Graph */}
        <div className="col-12 col-md-5">
          <h5 className={`text-center mb-3 ${styles.graphTitle}`}>Performance Graph</h5>
          <div className="d-flex justify-content-center">
            {barGraphData.length ? (
              <BarGraph data={barGraphData} />
            ) : (
              <p>No bar graph data</p>
            )}
          </div>
        </div>
      </div>

      {/* 📊 Row 2 */}
      <div className="row mt-5 gy-4">
        {/* Table */}
        <div className="col-12 col-lg-6">
          {safeTableData.columns.length && safeTableData.data.length ? (
            <Table columns={safeTableData.columns} data={safeTableData.data} />
          ) : (
            <p className="text-center">No test score data available</p>
          )}
        </div>

        {/* Line Graph */}
        <div className="col-12 col-lg-6">
          <h5 className={`text-center mb-3 ${styles.graphTitle}`}>Time vs Score</h5>
          <div className="d-flex justify-content-center">
            {lineGraphData.length ? (
              <LineGraph
                data={lineGraphData}
                lines={[{ dataKey: "marks", color: "#282A2B" }]}
              />
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
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  barGraphData: PropTypes.array,
  lineGraphData: PropTypes.array,
  attendance: PropTypes.shape({
    attended: PropTypes.number,
    total: PropTypes.number,
  }),
  accuracy: PropTypes.number,
};

export default StudentLayout;
