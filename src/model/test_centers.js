const listTestCenters = "SELECT * FROM Test_centers";
const searchTestCenterById = "SELECT * FROM Test_centers WHERE id = $1";
const checkTestCenterExist = "SELECT * FROM Test_centers WHERE center_name = $1";
const addTestCenters = "INSERT INTO Test_centers(center_name,place_name,longitude,latitude,user_id) VALUES($1,$2,$3,$4,$5)";
const updateTestCenters = "UPDATE Test_centers SET center_name = $1,place_name = $2,longitude = $3,latitude = $4 WHERE id = $5";
const removeTestCenters = "DELETE FROM Test_centers WHERE id = $1";

module.exports = {
    listTestCenters,
    searchTestCenterById,
    checkTestCenterExist,
    addTestCenters,
    updateTestCenters,
    removeTestCenters
}