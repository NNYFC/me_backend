const listTheme = "SELECT * FROM Themes";
const checkThemeExist = "SELECT * FROM Themes WHERE theme = $1";
const getThemeById = "SELECT * FROM Themes WHERE id = $1";
const addTheme = "INSERT INTO Themes(theme,description,color,user_id) VALUES($1,$2,$3,$4)";
const updateThemeDetails = "UPDATE Themes SET theme=$2,description=$3,color=$4 WHERE id = $1";
const removeTheme = "DELETE FROM Themes WHERE id = $1";


module.exports = {
    listTheme,
    checkThemeExist,
    getThemeById,
    addTheme,
    updateThemeDetails,
    removeTheme,
}